import { PartialAuthApi } from 'react-rb-auth';
export type LoginType = (email: string, password: string) => Promise<unknown>;

const TEST_TIMEOUT = 1000;

export class AuthApi implements PartialAuthApi {
  static login: LoginType = (email: string, password: string) =>
    new Promise((resolve, reject) => {
      console.log('AuthApi.login: args: ', email, password);
      if (email === 'nmpribeiro@gmail.com' && password === 'test') {
        console.log('will resolve');
        setTimeout(() => {
          resolve();
        }, TEST_TIMEOUT);
      } else {
        console.log('will reject');
        reject('credentials not right');
      }
    });

  static logout = () => new Promise((r) => setTimeout(() => r(), TEST_TIMEOUT));
  static signup = () => new Promise((r) => setTimeout(() => r(), TEST_TIMEOUT));
  static handle = () => new Promise((r) => setTimeout(() => r(), TEST_TIMEOUT));
  static silent = () => new Promise((r) => setTimeout(() => r(), TEST_TIMEOUT));
}
