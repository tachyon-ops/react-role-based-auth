import { PartialAuthApi } from 'react-rb-auth';

import { UserModel } from '../models/user';

export type LoginType = (user: UserModel) => Promise<UserModel>;
export type SignupType = () => Promise<unknown>;
export type HandleType = () => Promise<unknown>;
export type SilentType = (user: UserModel) => Promise<UserModel>;

const TEST_TIMEOUT = 1000;

export class AuthApi implements PartialAuthApi {
  static login: LoginType = (user) =>
    new Promise((resolve, reject) => {
      console.log('AuthApi.login: args: ', user);
      if (user) {
        console.log('will resolve');
        setTimeout(() => {
          resolve(user);
        }, TEST_TIMEOUT);
      } else {
        console.log('will reject');
        reject('credentials not right');
      }
    });

  static logout = () => new Promise((a) => setTimeout(() => a(), TEST_TIMEOUT));
  static signup = () =>
    new Promise((_a, r) => setTimeout(() => r(), TEST_TIMEOUT));
  static handle = () =>
    new Promise((_a, r) => setTimeout(() => r(), TEST_TIMEOUT));
  static silent = () => new Promise((a) => setTimeout(() => a(), TEST_TIMEOUT));
}
