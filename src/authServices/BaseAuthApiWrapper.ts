/* eslint-disable @typescript-eslint/no-explicit-any */
import { TokenUtil } from './TokenUtilities';
import { ApiAccessBuilder } from './RequestWrapper';

import {
  UnknownAuthProcess,
  SetterType,
  AuthApiInterface,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  KnownAuthProcess,
  RBAuthBaseRoles,
} from '..';
import { RBAuthInitialToken } from '../roles-based-auth/context';
import { RBAuthErrors } from '../rb-auth-errors';

type AuthProcessResponse = KnownAuthProcess<{
  tokens: RBAuthTokensType;
  user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
}>;

type RefreshProcessResponse = KnownAuthProcess<RBAuthTokensType>;

type ProcessesType<TLoging, LogOutType, SignUpType, SilentAuthType, HandleAuthType, RefreshTokens> =
  {
    login?: TLoging;
    logout?: LogOutType;
    signup?: SignUpType;
    silent?: SilentAuthType;
    handle?: HandleAuthType;
    refresh?: RefreshTokens;
  };

abstract class UserReloader {
  public setReloading: SetterType;
  public setUser: SetterType;
  constructor(setReloading: SetterType, setUser: SetterType) {
    this.setReloading = setReloading;
    this.setUser = setUser;
  }
}

type RefreshTokenEndLifeCallbackType = (rbAuthErros: RBAuthErrors, error?: Error) => void;

const dummyFunction = (arg: unknown) => new Promise<unknown>((resolve) => resolve(arg));

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
  implements AuthApiInterface
{
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

  private reloadFlag: boolean = true;

  constructor({
    setReloading,
    setUser,
    authApi,
    onAuthExpired,
    appApis,
    reloadFlag,
  }: {
    setReloading: SetterType;
    setUser: SetterType;
    authApi: ProcessesType<LoginType, LogOutType, SignUpType, SilentType, HandleType, RefreshType>;
    onAuthExpired?: RefreshTokenEndLifeCallbackType;
    appApis?: AppApis;
    reloadFlag?: boolean;
  }) {
    super(setReloading, setUser);
    if (onAuthExpired) this.errorCallback = onAuthExpired;
    if (appApis) this.appApis = this.embedWrapperLogicIntoApis(appApis);
    if (reloadFlag) this.reloadFlag = reloadFlag;
    if (!authApi) return;
    if (authApi.login) this.loginLogic = authApi.login;
    if (authApi.logout) this.logoutLogic = authApi.logout;
    if (authApi.signup) this.signupLogic = authApi.signup;
    if (authApi.handle) this.handleLogic = authApi.handle;
    if (authApi.silent) this.silentLogic = authApi.silent;
    if (authApi.refresh) this.refreshLogic = authApi.refresh;
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
  refresh: RefreshProcessResponse = async () => this.runRefresh(this.refreshLogic)();
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

  private runLogic =
    (logic: AuthProcessResponse) =>
    async (
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

  private runRefresh = (logic: RefreshProcessResponse) => async () =>
    this.wrap(async () => {
      const res = await logic();
      if (res.refreshToken) await TokenUtil.setTokens(res);
      return res;
    });

  // this means the access token got krazy!
  private accessTokenError = RBAuthErrors.UNAUTHORIZED;
  private refreshTokenError = RBAuthErrors.INVALID_GRANT;

  private apiWrap =
    (logic: <T>() => Promise<T>) =>
    (onSuccess: <T>(arg: T) => void, onError: (error: RBAuthErrors) => void) => {
      // console.log('inside apiWrap');
      return new ApiAccessBuilder(logic)
        .withSuccess(onSuccess)
        .withFailure(onError)
        .withAccessTokenError(this.accessTokenError)
        .withRefreshTokenError(this.refreshTokenError)
        .build(this.refresh as any);
    };

  private wrap = async <T>(logic: () => T) => {
    if (this.reloadFlag) this.setReloading(true);
    try {
      return await logic();
    } catch (e) {
      // console.log('wrap catch: ', e.message);
      if ((e as Error).message === 'Failed to fetch')
        this.errorCallback(RBAuthErrors.FAILLED_TO_FETCH, e as Error);
      // others
      else if ((e as Error).message === RBAuthErrors.UNAUTHORIZED)
        this.errorCallback(e as RBAuthErrors);
      else if ((e as Error).message === RBAuthErrors.REFRESH_TOKEN_NOT_PRESENT) {
        // swallow silently
      }
      // all others
      else if ((e as Error).message !== RBAuthErrors.REFRESH_TOKEN_NOT_PRESENT)
        this.errorCallback(RBAuthErrors.UNKNOWN, e as Error);
      throw e;
    } finally {
      if (this.reloadFlag) this.setReloading(false);
    }
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
