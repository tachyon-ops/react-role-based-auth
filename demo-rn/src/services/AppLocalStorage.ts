import { AsyncStorage } from 'react-native';
import { RBAuthStorageType, TokenUtil, RBAuthTokensType } from 'react-rb-auth';

const TOKENS_KEY = 'react_rb_auth_tokens';

export class AppStorage implements RBAuthStorageType {
  tokensKey: string;
  accessToken: string = '';
  refreshToken: string = '';
  openIdToken: string = '';
  tokenType: string = '';
  expiresIn: string = '';
  scope: string = '';

  constructor(setInitiated: (flag: boolean) => void, tokensKey: string = TOKENS_KEY) {
    this.tokensKey = tokensKey;
    this.init(setInitiated);
  }

  private async init(setInitiated: (flag: boolean) => void) {
    this.loadTokensFromStorage().then(() => setInitiated(true));
  }

  async loadTokensFromStorage() {
    const tokens = await AsyncStorage.getItem(this.tokensKey);
    if (tokens && tokens.length > 0) {
      const t: RBAuthTokensType = JSON.parse(tokens);
      this.accessToken = t.accessToken;
      this.refreshToken = t.refreshToken;
      this.openIdToken = t.openIdToken;
      this.expiresIn = t.expiresIn;
      this.scope = t.scope;
      this.tokenType = t.tokenType;
    }

    TokenUtil.setStorage(this);
  }

  async setTokens(tokens: RBAuthTokensType) {
    try {
      await this.setItem(this.tokensKey, tokens);
    } catch (e) {
      console.log('error while saving to your storage: ', e);
    }
  }

  setItem(key: string, value: Object = {}) {
    if (key && value) return AsyncStorage.setItem(key, JSON.stringify(value));
    else return;
  }
}
