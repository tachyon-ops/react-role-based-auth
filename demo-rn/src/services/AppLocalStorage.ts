import { AsyncStorage } from 'react-native';
import { TokenUtil } from '../../../src/lib/authServices/TokenUtilities';
import { RBAuthStorageType } from 'react-rb-auth';

export class AppStorage implements RBAuthStorageType {
  accessToken: string = '';
  refreshToken: string = '';
  openIdToken: string = '';
  tokenType: string = '';
  expiresIn: string = '';
  scope: string = '';

  constructor(setInitiated: (flag: boolean) => void) {
    this.init(setInitiated);
  }

  private async init(setInitiated: (flag: boolean) => void) {
    this.loadTokensFromStorage().then(() => setInitiated(true));
  }

  async loadTokensFromStorage() {
    this.accessToken = await AsyncStorage.getItem('access_token');
    this.refreshToken = await AsyncStorage.getItem('refresh_token');
    this.openIdToken = await AsyncStorage.getItem('openid_token');
    this.tokenType = await AsyncStorage.getItem('token_type');
    this.expiresIn = await AsyncStorage.getItem('expires_in');
    this.scope = await AsyncStorage.getItem('scope');

    TokenUtil.setStorage(this);
  }

  setAccessToken(accessToken: string = '') {
    return this.setItem('access_token', accessToken);
  }
  setRefreshToken(refreshToken: string = '') {
    return this.setItem('refresh_token', refreshToken);
  }
  setOpenIdToken(openIdToken: string = '') {
    return this.setItem('openid_token', openIdToken);
  }
  setTokenType(type: string = '') {
    return this.setItem('token_type', type);
  }
  setExpiresIn(expiresIn: string = '') {
    return this.setItem('expires_in', expiresIn);
  }
  setScope(scope: string = '') {
    return this.setItem('scope', scope);
  }

  setItem(key: string, value: string) {
    console.log(`setting item key: ${key} | value: ${value}`);
    return AsyncStorage.setItem(key, value);
  }
}
