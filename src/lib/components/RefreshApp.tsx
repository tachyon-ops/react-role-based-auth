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
}> = (props) => {
  const auth = useContext(AuthContext);
  const [isReloading, setIsReloading] = useState(true);

  useEffect(() => {
    if (auth.reloading && props.AuthLoadingComp !== undefined) setIsReloading(true);
    else setIsReloading(false);
  }, [auth.reloading, props.AuthLoadingComp]);

  const silentSwallow = () => null;

  useEffect(() => {
    if (!FirstRun.done && props.locationPathName !== props.authCallbackRoute) {
      FirstRun.done = true;
      console.log('will issue silent auth');
      auth.logic.silent().then(silentSwallow).catch(silentSwallow);
    }
  }, []);

  if (!FirstRun.done && props.AuthReloadingComp) return <props.AuthReloadingComp />;
  else
    return (
      <>
        {isReloading && props.AuthLoadingComp && <props.AuthLoadingComp />}
        {props.children}
      </>
    );
};
