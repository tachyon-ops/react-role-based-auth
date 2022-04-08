import { AuthContext, RBAuthReactContext } from 'react-rb-auth';

import { LoginType, SignupType, HandleType, SilentType, LogoutType, RefreshType } from './AuthApi';
import { UserModel } from '../models/user';
import { rules } from '../models/rules';
import { GlobalAppApi } from './ExternalApi';

export const AppAuthContext = AuthContext as RBAuthReactContext<
  UserModel,
  typeof rules,
  LoginType,
  LogoutType,
  SignupType,
  HandleType,
  SilentType,
  RefreshType,
  typeof GlobalAppApi
>;
