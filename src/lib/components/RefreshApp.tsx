import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '..';

class FirstRun {
  public static done = false;
}

export const RefreshApp: React.FC<{
  locationPathName: string;
  AuthReloadingComp: React.FC;
  AuthLoadingComp?: React.FC;
  authCallbackRoute?: string;
  debug?: boolean;
}> = ({
  children,
  locationPathName,
  AuthReloadingComp,
  AuthLoadingComp = undefined,
  authCallbackRoute,
  debug = false,
}) => {
  const auth = useContext(AuthContext);
  const [isReloading, setIsReloading] = useState(true);

  useEffect(() => {
    if (auth.reloading && AuthLoadingComp !== undefined) setIsReloading(true);
    else setIsReloading(false);
  }, [auth.reloading, AuthLoadingComp]);

  const silentSwallow = () => null;

  useEffect(() => {
    if (!FirstRun.done && locationPathName !== authCallbackRoute) {
      FirstRun.done = true;
      if (debug) console.log('will issue silent auth');
      auth.logic.silent().then(silentSwallow).catch(silentSwallow);
    }
  }, []);

  if (!FirstRun.done && AuthReloadingComp) return <AuthReloadingComp />;
  else
    return (
      <>
        {isReloading && AuthLoadingComp && <AuthLoadingComp />}
        {children}
      </>
    );
};
