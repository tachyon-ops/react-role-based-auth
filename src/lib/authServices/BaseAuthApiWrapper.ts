import { UnknownAuthProcess, SetterType, AuthApiInterface } from '..';

type ProcessesType = {
  login?: UnknownAuthProcess;
  logout?: UnknownAuthProcess;
  signup?: UnknownAuthProcess;
  handle?: UnknownAuthProcess;
  silent?: UnknownAuthProcess;
};

const defaultLogic = () => new Promise((r) => r());

abstract class BaseAuthApi implements AuthApiInterface {
  constructor(
    public setAuthenticated: SetterType,
    public setReloading: SetterType
  ) {}
  login: (...args: any) => Promise<any>;
  logout: (...args: any) => Promise<any>;
  signup: (...args: any) => Promise<any>;
  handle: (...args: any) => Promise<any>;
  silent: (...args: any) => Promise<any>;
}

export class BaseAuthApiWrapper extends BaseAuthApi
  implements AuthApiInterface {
  private loginLogic: UnknownAuthProcess = defaultLogic;
  private logoutLogic: UnknownAuthProcess = defaultLogic;
  private signupLogic: UnknownAuthProcess = defaultLogic;
  private handleLogic: UnknownAuthProcess = defaultLogic;
  private silentLogic: UnknownAuthProcess = defaultLogic;

  constructor(
    setter: SetterType,
    setReloading: SetterType,
    processes: ProcessesType
  ) {
    super(setter, setReloading);
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
        .then((res) => {
          this.setAuthenticated(true);
          resolve(res);
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
          resolve(res);
        })
        .catch(reject) // no need to logout on error right?
        .finally(this.finishReload);
    });

  signUp: UnknownAuthProcess = this.signupLogic;

  handle: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload();
      this.handleLogic(...args)
        .then((res) => {
          this.setAuthenticated(true);
          resolve(res);
        })
        .catch((e) => {
          this.setAuthenticated(false);
          reject(e);
        })
        .finally(this.finishReload);
    });

  silent: UnknownAuthProcess = (...args: any) =>
    new Promise((resolve, reject) => {
      this.startReload();
      this.silentLogic(...args)
        .then((res) => {
          this.setAuthenticated(true);
          resolve(res);
        })
        .catch((e) => {
          this.setAuthenticated(false);
          reject(e);
        })
        .finally(this.finishReload);
    });
}

export class AuthApiForContext extends BaseAuthApiWrapper {
  constructor(
    setAuthenticated: SetterType,
    setReloading: SetterType,
    authApi: Partial<AuthApiInterface>
  ) {
    super(setAuthenticated, setReloading, authApi);
  }
}
