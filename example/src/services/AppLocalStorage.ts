/* eslint-disable no-console */
import { RBAuthStorageType, TokenUtil, RBAuthTokensType } from 'react-rb-auth';

const TOKENS_KEY = 'react_rb_auth_tokens';

export class AppStorage implements RBAuthStorageType {
  tokensKey: string;
  accessToken = '';
  refreshToken = '';
  openIdToken = '';
  tokenType = '';
  expiresIn = '';
  scope = '';

  constructor(setInitiated: (flag: boolean) => void, tokensKey: string = TOKENS_KEY) {
    this.tokensKey = tokensKey;
    this.init(setInitiated);
  }

  private async init(setInitiated: (flag: boolean) => void) {
    this.loadTokensFromStorage().then(() => setInitiated(true));
  }

  private async loadTokensFromStorage() {
    const rawTokens = localStorage.getItem(this.tokensKey);
    if (rawTokens && rawTokens.length > 0) {
      const tokens: RBAuthTokensType = JSON.parse(rawTokens);
      console.log('AppStorage::loadTokensFromStorage tokens => ', tokens.refreshToken);
      // we only save refresh token :)
      this.refreshToken = tokens.refreshToken;
      this.accessToken = tokens.accessToken;
      this.openIdToken = tokens.openIdToken;
      this.expiresIn = tokens.expiresIn;
      this.scope = tokens.scope;
      this.tokenType = tokens.tokenType;
    }

    TokenUtil.setStorage(this);
  }

  async setTokens(tokens: RBAuthTokensType) {
    if (tokens.accessToken) this.accessToken = tokens.accessToken;
    if (tokens.expiresIn) this.expiresIn = tokens.expiresIn;
    if (tokens.openIdToken) this.openIdToken = tokens.openIdToken;
    if (tokens.tokenType) this.tokenType = tokens.tokenType;
    if (tokens.scope) this.scope = tokens.scope;
    if (tokens.refreshToken) this.refreshToken = tokens.refreshToken;

    try {
      // saving is up to you but you should only save what you need
      const valueToSave = {
        refreshToken: tokens.refreshToken,
      };
      this.setItem(this.tokensKey, valueToSave);
    } catch (e) {
      console.log('error while saving to your storage: ', e);
    }
  }

  setItem = async (key: string, value: Record<string, string> = {}) => {
    // console.log('setting item: ', key, value);
    if (key && value) return localStorage.setItem(key, JSON.stringify(value));
    else return;
  };
}
