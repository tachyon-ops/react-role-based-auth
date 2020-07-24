import { RBAuthTokensType, RBAuthStorageType } from '..';

import { RBAuthInitialToken } from '../roles-based-auth/context';

const initialStorage: RBAuthStorageType = {
  accessToken: null,
  refreshToken: null,
  openIdToken: null,
  tokenType: null,
  expiresIn: null,
  scope: null,
  setTokens: () => {},
};

export class TokenUtil {
  private static s: RBAuthStorageType = initialStorage;

  static setStorage(storage: RBAuthStorageType) {
    TokenUtil.s = storage;
  }

  static async setTokens(t: RBAuthTokensType = RBAuthInitialToken) {
    return TokenUtil.s.setTokens(t);
  }

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
