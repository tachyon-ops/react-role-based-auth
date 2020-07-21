import { AuthContext, RBAuthReactContext } from 'react-rb-auth';

import { UserModel } from '../models/user';
import { rules } from '../models/rules';
import { LoginType, SignupType, HandleType, SilentType, LogoutType } from './AuthApi';

export const AppAuthContext = AuthContext as RBAuthReactContext<
  UserModel,
  typeof rules,
  LoginType,
  LogoutType,
  SignupType,
  HandleType,
  SilentType
>;
