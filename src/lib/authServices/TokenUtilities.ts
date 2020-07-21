import { RBAuthTokensType, RBAuthStorageType } from '..';

import { RBAuthInitialToken } from './../roles-based-auth/context';

const initialStorage: RBAuthStorageType = {
  accessToken: null,
  refreshToken: null,
  openIdToken: null,
  tokenType: null,
  expiresIn: null,
  scope: null,
  setAccessToken: () => null,
  setRefreshToken: () => null,
  setOpenIdToken: () => null,
  setTokenType: () => null,
  setExpiresIn: () => null,
  setScope: () => null,
};

export class TokenUtil {
  private static s: RBAuthStorageType = initialStorage;

  static setStorage(storage: RBAuthStorageType) {
    TokenUtil.s = storage;
  }

  static async setTokens(t: RBAuthTokensType = RBAuthInitialToken) {
    try {
      if (t && t.accessToken) await TokenUtil.s.setAccessToken(t.accessToken);
      if (t && t.refreshToken) await TokenUtil.s.setRefreshToken(t.refreshToken);
      if (t && t.openIdToken) await TokenUtil.s.setOpenIdToken(t.openIdToken);
      if (t && t.tokenType) await TokenUtil.s.setTokenType(t.tokenType);
      if (t && t.expiresIn) await TokenUtil.s.setExpiresIn(t.expiresIn);
      if (t && t.scope) await TokenUtil.s.setScope(t.scope);
    } catch (e) {
      console.log('error while saving to your storage: ', e);
    }
  }

  static getTokens(): RBAuthTokensType {
    return {
      accessToken: TokenUtil.s.accessToken,
      refreshToken: TokenUtil.s.refreshToken,
      openIdToken: TokenUtil.s.openIdToken,
      tokenType: TokenUtil.s.tokenType,
      expiresIn: TokenUtil.s.expiresIn,
      scope: TokenUtil.s.scope,
    };
  }
}
