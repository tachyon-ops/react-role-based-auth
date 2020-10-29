/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UnknownAuthProcess,
  SetterType,
  AuthApiInterface,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  KnownAuthProcess,
  RBAuthErrors,
  ApiAccessBuilder,
} from '..';
import { RBAuthInitialToken } from '../roles-based-auth/context';
import { RBAuthBaseRoles } from '../index';
import { TokenUtil } from './TokenUtilities';

type AuthProcessResponse = KnownAuthProcess<{
  tokens: RBAuthTokensType;
  user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
}>;

type RefreshProcessResponse = KnownAuthProcess<RBAuthTokensType>;

type ProcessesType<
  TLoging,
  LogOutType,
  SignUpType,
  SilentAuthType,
  HandleAuthType,
  RefreshTokens
> = {
  login?: TLoging;
  logout?: LogOutType;
  signup?: SignUpType;
  silent?: SilentAuthType;
  handle?: HandleAuthType;
  refresh?: RefreshTokens;
};

abstract class UserReloader {
  constructor(public setReloading: SetterType, public setUser: SetterType) {}
}

type RefreshTokenEndLifeCallbackType = (rbAuthErros: RBAuthErrors, error?: Error) => void;

const dummyFunction = () => new Promise((r) => r());

export class BaseAuthApiWrapper<
    LoginType extends KnownAuthProcess<{
      tokens: RBAuthTokensType;
      user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
    }>,
    LogOutType extends UnknownAuthProcess,
    SignUpType extends KnownAuthProcess<unknown>,
    SilentType extends KnownAuthProcess<{
      tokens: RBAuthTokensType;
      user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
    }>,
    HandleType extends KnownAuthProcess<{
      tokens: RBAuthTokensType;
      user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
    }>,
    RefreshType extends KnownAuthProcess<RBAuthTokensType>,
    AppApis extends Record<string, unknown>
  >
  extends UserReloader
  implements AuthApiInterface {
  defaultLogin: LoginType = dummyFunction as LoginType;
  defaultLogout: LogOutType = dummyFunction as LogOutType;
  defaultSignupLogic: SignUpType = dummyFunction as SignUpType;
  defaultSilentLogic: SilentType = dummyFunction as SilentType;
  defaultHandleLogic: HandleType = dummyFunction as HandleType;
  defaultRefreshLogic: RefreshType = dummyFunction as RefreshType;

  private loginLogic: LoginType = this.defaultLogin;
  private logoutLogic: LogOutType = this.defaultLogout;
  private signupLogic: SignUpType = this.defaultSignupLogic;
  private silentLogic: SilentType = this.defaultSilentLogic;
  private handleLogic: HandleType = this.defaultHandleLogic;
  private refreshLogic: RefreshType = this.defaultRefreshLogic;
  private errorCallback: RefreshTokenEndLifeCallbackType = () => null;
  private appApis: Record<string, unknown> = {};

  constructor(
    setReloading: SetterType,
    setUser: SetterType,
    processes: ProcessesType<
      LoginType,
      LogOutType,
      SignUpType,
      SilentType,
      HandleType,
      RefreshType
    >,
    refreshTokenEndLifeCallback?: RefreshTokenEndLifeCallbackType,
    appApis?: AppApis
  ) {
    super(setReloading, setUser);
    if (refreshTokenEndLifeCallback) this.errorCallback = refreshTokenEndLifeCallback;
    if (appApis) this.appApis = this.embedWrapperLogicIntoApis(appApis);
    if (!processes) return;
    if (processes.login) this.loginLogic = processes.login;
    if (processes.logout) this.logoutLogic = processes.logout;
    if (processes.signup) this.signupLogic = processes.signup;
    if (processes.handle) this.handleLogic = processes.handle;
    if (processes.silent) this.silentLogic = processes.silent;
    if (processes.refresh) this.refreshLogic = processes.refresh;
  }

  public get apis(): Record<string, unknown> {
    return this.appApis;
  }

  login: AuthProcessResponse = async (...args: any) => this.runLogic(this.loginLogic)(...args);
  handle: AuthProcessResponse = async (...args: any) => this.runLogic(this.handleLogic)(...args);
  silent: AuthProcessResponse = async (...args: any) => this.runLogic(this.silentLogic)(...args);
  // simple signup
  signup: UnknownAuthProcess = (...args: any) => this.signupLogic(...args);
  // custom logic
  refresh: RefreshProcessResponse = async (f: boolean) => this.runRefresh(this.refreshLogic)(f);
  logout: UnknownAuthProcess = async (...args: any) =>
    this.wrap(async () => {
      const res = await this.logoutLogic(...args);
      await this.authenticate();
      return res;
    });

  /**
   * private Helpers
   */
  private embedWrapperLogicIntoApis(apis: AppApis) {
    const result: Record<string, unknown> = {};
    Object.keys(apis).forEach((item) => {
      if (item.startsWith('logic') && apis[item] && typeof apis[item] === 'function')
        result[item] = this.apiWrap(apis[item] as <T>() => Promise<T>);
      else if (apis[item] !== null && typeof apis[item] === 'object')
        result[item] = this.embedWrapperLogicIntoApis(apis[item] as AppApis);
      else result[item] = apis[item];
    });
    return result;
  }

  private runLogic = (logic: AuthProcessResponse) => async (
    ...args: any
  ): Promise<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }> =>
    this.wrap(async () => {
      const res = await logic(...args);
      // console.log('res', res);
      await this.authenticate(res);
      return res;
    });

  private runRefresh = (logic: RefreshProcessResponse) => async (flag: boolean) =>
    this.wrap(async () => {
      const res = await logic();
      if (res.refreshToken) await TokenUtil.setTokens(res);
      return res;
    }, flag);

  // this means the access token got krazy!
  private accessTokenError = RBAuthErrors.UNAUTHORIZED;
  private refreshTokenError = RBAuthErrors.INVALID_GRANT;

  private apiWrap = (logic: <T>() => Promise<T>) => (
    onSuccess: <T>(arg: T) => void,
    onError: (error: RBAuthErrors) => void
  ) => {
    // console.log('inside apiWrap');
    return new ApiAccessBuilder(logic)
      .withSuccess(onSuccess)
      .withFailure(onError)
      .withAccessTokenError(this.accessTokenError)
      .withRefreshTokenError(this.refreshTokenError)
      .build(this.refresh as any);
  };

  private wrap = async <T>(logic: () => T, flag = true) => {
    if (flag) this.setReloading(true);
    try {
      return await logic();
    } catch (e) {
      // console.log('wrap catch: ', e.message);
      if (e.message === 'Failed to fetch') this.errorCallback(RBAuthErrors.FAILLED_TO_FETCH, e);
      // others
      else if (e.message === RBAuthErrors.UNAUTHORIZED) this.errorCallback(e);
      else if (e.message === RBAuthErrors.REFRESH_TOKEN_NOT_PRESENT) {
        // swallow silently
      }
      // all others
      else if (e.message !== RBAuthErrors.REFRESH_TOKEN_NOT_PRESENT)
        this.errorCallback(RBAuthErrors.UNKNOWN, e);
      throw e;
    } finally {
      if (flag) this.setReloading(false);
    }
    // try {
    //   return logic();
    // } catch (error) {
    //   if (error.message === AuthErrors.REFRESH_TOKEN_NOT_PRESENT) {
    //     // swallow
    //   }
    //   //  else if (error.message === AuthErrors.REFRESH_TOKEN_REVOKED) {
    //   //   this.errorCallback(AuthErrors.REFRESH_TOKEN_REVOKED);
    //   // } else if (
    //   //   error.mesage === AuthErrors.UNAUTHORIZED ||
    //   //   error.mesage === 'JSON Parse error: Unexpected identifier "Unauthorized"'
    //   // ) {
    //   //   this.errorCallback(AuthErrors.UNAUTHORIZED);
    //   // } else if (error.message === AuthErrors.TOO_MANY_REQUESTS) {
    //   //   this.errorCallback(AuthErrors.TOO_MANY_REQUESTS);
    //   // }
    //   console.log('wrap catch: ', error, error.message);
    //   // throw error;
    //   return null;
    // } finally {
    //   if (flag) this.setReloading(false);
    // }
  };

  private authenticate = async (
    res: {
      tokens: RBAuthTokensType;
      user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
    } | null = null
  ) => {
    if (res && res.user && res.tokens) {
      this.setUser(res.user);
      await TokenUtil.setTokens(res.tokens);
    } else {
      this.setUser(null);
      await TokenUtil.setTokens(RBAuthInitialToken);
    }
  };
}
