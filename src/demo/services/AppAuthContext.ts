import { AuthContext, RBAuthContextType } from '../../lib/index';
import { UserModel } from '../models/user';

export const AppAuthContext = AuthContext as React.Context<RBAuthContextType<UserModel>>;
