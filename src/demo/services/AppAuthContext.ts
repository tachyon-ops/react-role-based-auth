import { createContext } from 'react';
import { getInitialAuthContext } from '../../lib/roles-based-auth/context';

import { UserModel, anonUser } from '../models/user';

export const AppAuthContext = createContext(getInitialAuthContext<UserModel>(anonUser));
