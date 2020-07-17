import { UnknownAuthProcess, SetterType, AuthApiInterface } from '..';
import { RBAuthInitialUser } from '../roles-based-auth/context';

type ProcessesType = {
  login?: UnknownAuthProcess;
  logout?: UnknownAuthProcess;
  signup?: UnknownAuthProcess;
  handle?: UnknownAuthProcess;
  silent?: UnknownAuthProcess;
};

const defaultLogicReturnsUser: UnknownAuthProcess = () =>
  new Promise((r) => r(RBAuthInitialUser));
const defaultLogic = () => new Promise((r) => r({}));

abstract class BaseAuthApi implements AuthApiInterface {
  constructor(
    public setAuthenticated: SetterType,
    public setReloading: SetterType,
    public setTokens: SetterType,
    public setUser: SetterType
  ) {}
  login: UnknownAuthProcess;
  logout: (...args: any) => Promise<any>;
  signup: (...args: any) => Promise<any>;
  handle: (...args: any) => Promise<any>;
  silent: UnknownAuthProcess;
}

export class BaseAuthApiWrapper extends BaseAuthApi
  implements AuthApiInterface {
  private loginLogic: UnknownAuthProcess = defaultLogicReturnsUser;
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

  startReload = () => this.setReloading(true);
  finishReload = () => this.setReloading(false);

  login: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload();
      this.loginLogic(...args)
        // Remember: res must be a user!
        .then((user) => {
          this.setAuthenticated(true);
          this.setUser(user);
          resolve(user);
        })
        .catch((e) => {
          this.setAuthenticated(false);
          reject(e);
        })
        .finally(this.finishReload);
    });

  logout: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload();
      this.logoutLogic(...args)
        .then((res) => {
          this.setAuthenticated(false);
          this.setUser(RBAuthInitialUser);
          resolve(res);
        })
        .catch(reject) // no need to logout on error right?
        .finally(this.finishReload);
    });

  signUp: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.signupLogic(...args)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });

  handle: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload();
      this.handleLogic(...args)
        .then((res) => {
          this.setAuthenticated(true);
          this.setUser(res);
          resolve(res);
        })
        .catch((e) => {
          this.setAuthenticated(false);
          this.setUser(RBAuthInitialUser);
          reject(e);
        })
        .finally(this.finishReload);
    });

  silent: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload();
      this.silentLogic(...args)
        .then((res) => {
          this.authenticate(res);
          resolve(res);
        })
        .catch((e) => {
          this.authenticate();
          reject(e);
        })
        .finally(this.finishReload);
    });

  authenticate = <T>(user: T = null) => {
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
