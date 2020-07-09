import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '..';

interface Props {
  AuthReloadingComp: React.FC;
  authCallbackRoute?: string;
}

export const BrowserRefresh: React.FC<Props> = (props) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [isAuthReloaded, setIsAuthReloaded] = useState(false);
  const [showReloadCom, setShowReloadComp] = useState(true);

  useEffect(() => {
    setShowReloadComp(location.pathname !== props.authCallbackRoute && authContext.reloading);
  }, [location.pathname, props.authCallbackRoute, authContext.reloading]);

  if (!isAuthReloaded) {
    setIsAuthReloaded(true);
    if (location.pathname !== props.authCallbackRoute) {
      try {
        authContext.silentAuth();
      } catch (err) {
        console.error(err.error);
      }
    }
  }
  if (showReloadCom) return <props.AuthReloadingComp />;
  else return <>{props.children}</>;
};
