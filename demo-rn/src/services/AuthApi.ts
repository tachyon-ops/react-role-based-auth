import { PartialAuthApi } from 'react-rb-auth';
import { regUser } from '../models/user';

export type LoginType = (email: string, password: string) => Promise<unknown>;
export type SignupType = () => Promise<unknown>;
export type HandleType = () => Promise<unknown>;
export type SilentType = () => Promise<unknown>;

const TEST_TIMEOUT = 1000;

export class AuthApi implements PartialAuthApi {
  static login: LoginType = (email: string, password: string) =>
    new Promise((resolve, reject) => {
      console.log('AuthApi.login: args: ', email, password);
      if (email !== '' && password === 'test') {
        console.log('will resolve', regUser);
        setTimeout(() => {
          resolve(regUser);
        }, TEST_TIMEOUT);
      } else {
        console.log('will reject');
        reject('credentials not right');
      }
    });

  static logout = () => new Promise((a, r) => setTimeout(() => a(), TEST_TIMEOUT));
  static signup = () => new Promise((a, r) => setTimeout(() => a(), TEST_TIMEOUT));
  static handle = () => new Promise((a, r) => setTimeout(() => r(), TEST_TIMEOUT));
  static silent = () => new Promise((a, r) => setTimeout(() => r(), TEST_TIMEOUT));
}
