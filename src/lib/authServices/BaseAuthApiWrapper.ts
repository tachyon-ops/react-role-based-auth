import {
  UnknownAuthProcess,
  SetterType,
  AuthApiInterface,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  KnownAuthProcess,
  RBAuthBaseStorageMechanism,
} from '..';
import {
  RBAuthInitialUser,
  RBAuthInitialToken,
} from '../roles-based-auth/context';
import { RBAuthBaseRoles } from '../index';

type ProcessesType = {
  login?: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }>;
  logout?: UnknownAuthProcess;
  signup?: UnknownAuthProcess;
  handle?: UnknownAuthProcess;
  silent?: UnknownAuthProcess;
};

const defaultLogicReturnsUser = <R>() =>
  new Promise((r) => r((RBAuthInitialUser as unknown) as R)) as Promise<R>;
const defaultLogic = () => new Promise((r) => r({}));

abstract class BaseAuthApi implements AuthApiInterface {
  constructor(
    public setAuthenticated: SetterType,
    public setReloading: SetterType,
    public setTokens: SetterType,
    public setUser: SetterType
  ) {}
  login: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }>;
  logout: (...args: any) => Promise<any>;
  signup: (...args: any) => Promise<any>;
  handle: (...args: any) => Promise<any>;
  silent: UnknownAuthProcess;
}

export class TokensUtil {
  private static _instance: TokensUtil;
  private constructor() {}
  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this());
  }

  private static storage: RBAuthBaseStorageMechanism;

  setStorageMechanism(storageMechanism: RBAuthBaseStorageMechanism) {
    TokensUtil.storage = storageMechanism;
  }

  setTokens(authTokens: RBAuthTokensType = RBAuthInitialToken) {
    // TODO: set tokens in async storage or local storage
    if (TokensUtil.storage) {
      TokensUtil.storage.Access = authTokens?.accessToken || null;
      TokensUtil.storage.Refresh = authTokens?.refreshToken || null;
      TokensUtil.storage.OpenId = authTokens?.idToken || null;
      TokensUtil.storage.Type = authTokens?.tokenType || null;
    }
  }

  static get accessToken() {
    return TokensUtil.storage.Access;
  }
  static get refreshToken() {
    return TokensUtil.storage.Refresh;
  }
  static get idToken() {
    return TokensUtil.storage.OpenId;
  }
  static get tokenType() {
    return TokensUtil.storage.Type;
  }
}

export class BaseAuthApiWrapper extends BaseAuthApi
  implements AuthApiInterface {
  private loginLogic: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }> = defaultLogicReturnsUser;
  private logoutLogic: UnknownAuthProcess = defaultLogic;
  private signupLogic: UnknownAuthProcess = defaultLogic;
  private handleLogic: UnknownAuthProcess = defaultLogic;
  private silentLogic: UnknownAuthProcess = defaultLogicReturnsUser;

  constructor(
    setAuthenticated: SetterType,
    setReloading: SetterType,
    setTokens: SetterType,
    setUser: SetterType,
    processes: ProcessesType
  ) {
    super(setAuthenticated, setReloading, setTokens, setUser);
    if (!processes) return;
    if (processes.login) this.loginLogic = processes.login;
    if (processes.logout) this.logoutLogic = processes.logout;
    if (processes.signup) this.signupLogic = processes.signup;
    if (processes.handle) this.handleLogic = processes.handle;
    if (processes.silent) this.silentLogic = processes.silent;
  }

  signup: UnknownAuthProcess = (...args: any) => this.signupLogic(...args);

  login: KnownAuthProcess<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }> = (...args: any) =>
    new Promise((resolve, reject) => {
      this.loginLogic(...args).then((res) => {
        console.log('BaseAuthApiWrapper login then res: ', res);
        if (res.tokens && res.user) {
          TokensUtil.Instance.setTokens(res.tokens);
          this.authenticate(res.user);
          resolve(res);
        } else {
          reject('');
        }
      });
    });

  logout: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload(this.logoutLogic(...args))
        .then((res) => {
          TokensUtil.Instance.setTokens();
          this.setAuthenticated(false);
          this.setUser(RBAuthInitialUser);
          resolve(res);
        })
        .catch(reject) // no need to logout on error right?
        .finally(this.finishReload);
    });

  handle: UnknownAuthProcess = (...args: any) =>
    this.startReload(this.handleLogic(...args))
      .then(this.authenticate)
      .catch((e) => {
        this.setAuthenticated(false);
        this.setUser(RBAuthInitialUser);
        return e;
      })
      .finally(this.finishReload);

  silent: UnknownAuthProcess = (...args: any) =>
    this.startReload(this.silentLogic(...args))
      .then(this.authenticate)
      .finally(this.finishReload);

  /**
   * Helpers Logic
   */
  private startReload = (logic: Promise<unknown>) => {
    this.setReloading(true);
    return logic;
  };
  private finishReload = () => this.setReloading(false);

  private authenticate = <T>(user: T = null) => {
    if (user) {
      this.setAuthenticated(true);
      this.setUser(user);
    } else {
      this.setAuthenticated(false);
      this.setUser(RBAuthInitialUser);
    }
  };
}

export class AuthApiForContext extends BaseAuthApiWrapper {
  constructor(
    setAuthenticated: SetterType,
    setReloading: SetterType,
    setTokens: SetterType,
    setUser: SetterType,
    authApi: Partial<AuthApiInterface>
  ) {
    super(setAuthenticated, setReloading, setTokens, setUser, authApi);
  }
}
