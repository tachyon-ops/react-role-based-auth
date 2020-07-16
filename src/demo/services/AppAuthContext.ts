import { AuthContext, RBAuthReactContext } from 'react-rb-auth';

import { UserModel } from '../models/user';
import { rules } from '../models/rules';

export const AppAuthContext = AuthContext as RBAuthReactContext<UserModel, typeof rules>;
