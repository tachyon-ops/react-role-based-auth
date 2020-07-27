import {
  UnknownAuthProcess,
  SetterType,
  AuthApiInterface,
  RBAuthTokensType,
  RBAuthUserModelWithRole,
  KnownAuthProcess,
} from '..';
import { RBAuthInitialUser, RBAuthInitialToken } from '../roles-based-auth/context';
import { RBAuthBaseRoles } from '../index';
import { TokenUtil } from './TokenUtilities';

type AuthProcessResponse = KnownAuthProcess<{
  tokens: RBAuthTokensType;
  user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
}>;

type ProcessesType = {
  login?: AuthProcessResponse;
  logout?: UnknownAuthProcess;
  signup?: UnknownAuthProcess;
  handle?: AuthProcessResponse;
  silent?: AuthProcessResponse;
};

const defaultLogicReturnsUser = <R>() =>
  new Promise((r) => r((RBAuthInitialUser as unknown) as R)) as Promise<R>;
const defaultLogic = () => new Promise((r) => r({}));

abstract class BaseAuthApi implements AuthApiInterface {
  constructor(
    public setAuthenticated: SetterType,
    public setReloading: SetterType,
    public setUser: SetterType
  ) {}
  login: AuthProcessResponse;
  logout: (...args: any) => Promise<any>;
  signup: (...args: any) => Promise<any>;
  handle: AuthProcessResponse;
  silent: AuthProcessResponse;
}

export class BaseAuthApiWrapper extends BaseAuthApi implements AuthApiInterface {
  private loginLogic: AuthProcessResponse = defaultLogicReturnsUser;
  private logoutLogic: UnknownAuthProcess = defaultLogic;
  private signupLogic: UnknownAuthProcess = defaultLogic;
  private handleLogic: AuthProcessResponse = defaultLogicReturnsUser;
  private silentLogic: AuthProcessResponse = defaultLogicReturnsUser;

  constructor(
    setAuthenticated: SetterType,
    setReloading: SetterType,
    setUser: SetterType,
    processes: ProcessesType
  ) {
    super(setAuthenticated, setReloading, setUser);
    if (!processes) return;
    if (processes.login) this.loginLogic = processes.login;
    if (processes.logout) this.logoutLogic = processes.logout;
    if (processes.signup) this.signupLogic = processes.signup;
    if (processes.handle) this.handleLogic = processes.handle;
    if (processes.silent) this.silentLogic = processes.silent;
  }

  login: AuthProcessResponse = async (...args: any) => this.runLogic(this.loginLogic)(...args);
  signup: UnknownAuthProcess = (...args: any) => this.signupLogic(...args);
  logout: UnknownAuthProcess = async (...args: any) => {
    this.setReloading(true);
    const res = await this.logoutLogic(...args);
    this.authenticate();
    return res;
  };
  handle: AuthProcessResponse = async (...args: any) => this.runLogic(this.handleLogic)(...args);
  silent: AuthProcessResponse = async (...args: any) => this.runLogic(this.silentLogic)(...args);

  /**
   * Helpers Logic
   */

  private runLogic = (logic: AuthProcessResponse) => async (
    ...args: any
  ): Promise<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }> => {
    this.setReloading(true);
    const res = await logic(...args);
    await this.authenticate(res);
    return res;
  };

  private authenticate = async (
    res: {
      tokens: RBAuthTokensType;
      user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
    } = null
  ) => {
    if (res && res.user && res.tokens) {
      this.setAuthenticated(true);
      this.setUser(res.user);
      await TokenUtil.setTokens(res.tokens);
    } else {
      this.setAuthenticated(false);
      this.setUser(RBAuthInitialUser);
      await TokenUtil.setTokens(RBAuthInitialToken);
    }
    this.setReloading(false);
  };
}

export class AuthApiForContext extends BaseAuthApiWrapper {
  constructor(
    setAuthenticated: SetterType,
    setReloading: SetterType,
    setUser: SetterType,
    authApi: Partial<AuthApiInterface>
  ) {
    super(setAuthenticated, setReloading, setUser, authApi);
  }
}
