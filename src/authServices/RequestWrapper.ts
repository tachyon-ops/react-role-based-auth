import { RBAuthErrors } from '../rb-auth-errors'

const RECUR_LEVEL = 1

type RefreshType = (reloadFlag?: boolean) => Promise<Response>
type RequestType = <T>() => Promise<T>

type OnSuccessType = <T>(arg: T) => void
type OnFailureType = (error: RBAuthErrors) => void

class RequestWrapper {
  private static recursion = async (
    refresh: RefreshType,
    req: RequestType,
    onSuccess: OnSuccessType,
    onFailure: OnFailureType,
    recursion = RECUR_LEVEL,
    accessTokenError = RBAuthErrors.UNAUTHORIZED,
    refresTokenError = RBAuthErrors.INVALID_GRANT
  ): Promise<void> => {
    // console.log('RequestWrapper::recursion');
    try {
      // console.log('RequestWrapper::recursion will request');
      await req()
      // console.log('RequestWrapper::recursion has request');
    } catch (e) {
      if (e.message === accessTokenError && recursion >= 1) {
        try {
          // refresh
          await refresh()
          // then
          return RequestWrapper.recursion(
            refresh,
            req,
            onSuccess,
            onFailure,
            recursion - 1,
            accessTokenError,
            refresTokenError
          )
        } catch (error) {
          onFailure(RBAuthErrors.REFRESH_TOKEN_REVOKED)
          throw new Error(RBAuthErrors.REFRESH_TOKEN_REVOKED)
        }
      } else {
        onFailure(e)
      }
      throw e
    }
  }

  /**
   * RequestWrapper::handle()
   *
   * @param request Actual request to be performed
   * @param onSuccess Receives res: <T>(res: T) => void as success logic
   * @param onFailure Receives error: <T>(error: T) => void as failure logic
   */
  static handle(
    request: RequestType,
    onSuccess: OnSuccessType,
    onFailure: OnFailureType,
    recursion = RECUR_LEVEL,
    accessTokenError = RBAuthErrors.UNAUTHORIZED,
    refresTokenError = RBAuthErrors.INVALID_GRANT
  ) {
    /**
     * onPress logic
     * @param refresh Logic for refreshing tokens
     */
    return (refreshLogic: RefreshType) => async () =>
      RequestWrapper.recursion(
        refreshLogic,
        request,
        onSuccess,
        onFailure,
        recursion,
        accessTokenError,
        refresTokenError
      )
  }
}

export class ApiAccessBuilder {
  private success: OnSuccessType = () => null
  private failure: OnFailureType = () => null
  private recursions: number = RECUR_LEVEL
  private accessTokenError: RBAuthErrors = RBAuthErrors.INVALID_GRANT
  private refreshTokenError: RBAuthErrors = RBAuthErrors.REFRESH_TOKEN_REVOKED

  constructor(private logic: <T>() => Promise<T>) {}

  withAccessTokenError(accessTokenError: RBAuthErrors) {
    this.accessTokenError = accessTokenError
    return this
  }

  withRefreshTokenError(refreshTokenError: RBAuthErrors) {
    this.refreshTokenError = refreshTokenError
    return this
  }

  withSuccess(success: OnSuccessType) {
    this.success = success
    return this
  }

  withFailure(failure: OnFailureType) {
    this.failure = failure
    return this
  }

  withCustomRecursions(recursions: number) {
    this.recursions = recursions
    return this
  }

  build(refresh: RefreshType) {
    return RequestWrapper.handle(
      this.logic,
      this.success,
      this.failure,
      this.recursions,
      this.accessTokenError,
      this.refreshTokenError
    )(refresh)
  }
}
