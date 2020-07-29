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

type RefreshProcessResponse = KnownAuthProcess<RBAuthTokensType>;

type ProcessesType = {
  login?: AuthProcessResponse;
  logout?: UnknownAuthProcess;
  signup?: UnknownAuthProcess;
  handle?: AuthProcessResponse;
  silent?: AuthProcessResponse;
  refresh?: RefreshProcessResponse;
};

const defaultLogicReturnsUser = <R>() =>
  new Promise((r) => r((RBAuthInitialUser as unknown) as R)) as Promise<R>;
const defaultLogic = () => new Promise((r) => r({}));

abstract class UserReloader {
  constructor(public setReloading: SetterType, public setUser: SetterType) {}
}

export class BaseAuthApiWrapper extends UserReloader implements AuthApiInterface {
  private loginLogic: AuthProcessResponse = defaultLogicReturnsUser;
  private logoutLogic: UnknownAuthProcess = defaultLogic;
  private signupLogic: UnknownAuthProcess = defaultLogic;
  private handleLogic: AuthProcessResponse = defaultLogicReturnsUser;
  private silentLogic: AuthProcessResponse = defaultLogicReturnsUser;
  private refreshLogic: RefreshProcessResponse = defaultLogicReturnsUser;

  constructor(setReloading: SetterType, setUser: SetterType, processes: ProcessesType) {
    super(setReloading, setUser);
    if (!processes) return;
    if (processes.login) this.loginLogic = processes.login;
    if (processes.logout) this.logoutLogic = processes.logout;
    if (processes.signup) this.signupLogic = processes.signup;
    if (processes.handle) this.handleLogic = processes.handle;
    if (processes.silent) this.silentLogic = processes.silent;
    if (processes.refresh) this.refreshLogic = processes.refresh;
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
   * private
   * Helpers Logic
   */
  private runLogic = (logic: AuthProcessResponse) => async (
    ...args: any
  ): Promise<{
    tokens: RBAuthTokensType;
    user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
  }> =>
    this.wrap(async () => {
      const res = await logic(...args);
      await this.authenticate(res);
      return res;
    });

  private runRefresh = (logic: RefreshProcessResponse) => async (flag: boolean) =>
    this.wrap(async () => {
      const res = await logic();
      if (res.refreshToken) await TokenUtil.setTokens(res);
      return res;
    }, flag);

  private wrap = <T>(logic: () => T, flag: boolean = true) => {
    if (flag) this.setReloading(true);
    try {
      return logic();
    } catch (err) {
      throw err;
    } finally {
      if (flag) this.setReloading(false);
    }
  };

  private authenticate = async (
    res: {
      tokens: RBAuthTokensType;
      user: RBAuthUserModelWithRole<RBAuthBaseRoles>;
    } = null
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
