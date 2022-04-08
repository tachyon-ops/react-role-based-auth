import React, { useContext } from 'react';

import { AuthContext } from '../roles-based-auth/context';

export const SecureScreen: React.FC<{
  Allowed: React.ReactNode | React.ReactNodeArray;
  NotAllowed?: React.ReactNode | React.ReactNodeArray;
  onSecureScreen?: () => void;
}> = ({ Allowed, NotAllowed, onSecureScreen }) => {
  const auth = useContext(AuthContext);

  if (!auth.isAuth) {
    if (onSecureScreen) onSecureScreen();
    else if (NotAllowed) return <>{NotAllowed}</>;
    // Show nothing
    return <></>;
  }
  return <>{Allowed}</>;
};
