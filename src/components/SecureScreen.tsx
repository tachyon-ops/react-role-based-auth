import React, { useContext } from 'react';

import { AuthContext } from '../roles-based-auth/context';

export const SecureScreen: React.FC<{
  Allowed: React.ReactNode | React.ReactNodeArray;
  NotAllowed?: React.ReactNode | React.ReactNodeArray;
  onSecureScreen?: () => void;
}> = ({ Allowed, NotAllowed, onSecureScreen }) => {
  const auth = useContext(AuthContext);

  if (!auth.isAuth) {
    if (onSecureScreen) setTimeout(onSecureScreen); // on first CPU availability
    else if (NotAllowed) return <React.Fragment>{NotAllowed}</React.Fragment>;
    // Show nothing
    return <React.Fragment />;
  }
  return <React.Fragment>{Allowed}</React.Fragment>;
};
