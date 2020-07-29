// 401 is the code spit by Auth0 when a token get's expired
const UNAUTHORIZED_CODE = 401;
const RECUR_LEVEL = 1;

type RefreshType = (reloadFlag?: boolean) => Promise<unknown>;
type RequestType = () => Promise<Response>;

type OnSuccessType = <T>(arg: T) => void;
type OnFailureType = (error: string) => void;

class RequestWrapper {
  private static recursion = async <T>(
    refresh: RefreshType,
    req: RequestType,
    success: OnSuccessType,
    failure: OnFailureType,
    unauthorizedCode = UNAUTHORIZED_CODE,
    recursion = RECUR_LEVEL
  ): Promise<void> => {
    const res = await req();
    if (res.status === UNAUTHORIZED_CODE && recursion >= 1) {
      // refresh
      await refresh();
      // then
      return RequestWrapper.recursion<T>(
        refresh,
        req,
        success,
        failure,
        unauthorizedCode,
        recursion - 1
      );
    } else {
      // last recursion
      if (res.ok) success<T>(await res.json());
      else failure(await res.text());
    }
  };

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
    unauthorizedCode = UNAUTHORIZED_CODE,
    recursion = RECUR_LEVEL
  ) {
    /**
     * onPress logic
     * @param refresh Logic for refreshing tokens
     */
    return (refreshLogic: RefreshType) => () =>
      RequestWrapper.recursion(
        refreshLogic,
        request,
        onSuccess,
        onFailure,
        unauthorizedCode,
        recursion
      );
  }
}

export class ApiAccessBuilder {
  private success: OnSuccessType;
  private failure: OnFailureType;
  private unauthorizedCode: number;
  private recursions: number;

  constructor(private logic: RequestType) {}

  withSuccess(success: OnSuccessType) {
    this.success = success;
    return this;
  }

  withFailure(failure: OnFailureType) {
    this.failure = failure;
    return this;
  }

  withUnauthorizedCode(unauthorizedCode: number) {
    this.unauthorizedCode = unauthorizedCode;
    return this;
  }

  withCustomRecursions(recursions: number) {
    this.recursions = recursions;
    return this;
  }

  build(refresh: RefreshType) {
    return RequestWrapper.handle(
      this.logic,
      this.success,
      this.failure,
      this.unauthorizedCode,
      this.recursions
    )(refresh);
  }
}
