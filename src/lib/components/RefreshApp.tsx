import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '..';

export const RefreshApp: React.FC<{
  locationPathName: string;
  AuthReloadingComp: React.FC;
  authCallbackRoute?: string;
}> = (props) => {
  const auth = useContext(AuthContext);
  const [isAuthReloaded, setIsAuthReloaded] = useState(false);
  const [showReloadCom, setShowReloadComp] = useState(true);

  useEffect(() => {
    setShowReloadComp(props.locationPathName !== props.authCallbackRoute && auth.reloading);
  }, [props.locationPathName, props.authCallbackRoute, auth.reloading]);

  if (!isAuthReloaded) {
    setIsAuthReloaded(true);
    if (props.locationPathName !== props.authCallbackRoute) auth.logic.silent();
  }
  if (showReloadCom) return <props.AuthReloadingComp />;
  else return <>{props.children}</>;
};
