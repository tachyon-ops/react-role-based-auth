import { RBAuthTokensType, RBAuthStorageType } from '../types';

import { RBAuthInitialToken } from '../roles-based-auth/context';

const initialStorage: RBAuthStorageType = {
  accessToken: '',
  refreshToken: '',
  openIdToken: '',
  tokenType: '',
  expiresIn: '',
  scope: '',
  setTokens: () => null,
};

export class TokenUtil {
  private static s: RBAuthStorageType = initialStorage;

  static setStorage(storage: RBAuthStorageType) {
    TokenUtil.s = storage;
  }

  static setTokens = (t: RBAuthTokensType = RBAuthInitialToken) => TokenUtil.s.setTokens(t);

  static getTokens(): RBAuthTokensType {
    return {
      accessToken: TokenUtil.s.accessToken || '',
      refreshToken: TokenUtil.s.refreshToken || '',
      openIdToken: TokenUtil.s.openIdToken || '',
      tokenType: TokenUtil.s.tokenType || '',
      expiresIn: TokenUtil.s.expiresIn || '',
      scope: TokenUtil.s.scope || '',
    };
  }
}
