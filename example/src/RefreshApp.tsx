import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "react-rb-auth";

class FirstRun {
  public static done = false;
}

export const RefreshApp: React.FC<{
  locationPathName: string;
  AuthReloadingComp: React.FC;
  AuthLoadingComp?: React.FC;
  authCallbackRoute?: string;
  onReloadFinished?: VoidFunction;
  debug?: boolean;
}> = ({
  children,
  locationPathName,
  AuthReloadingComp,
  AuthLoadingComp = undefined,
  authCallbackRoute,
  onReloadFinished,
  debug = false,
}) => {
  const auth = useContext(AuthContext);
  const [isReloading, setIsReloading] = useState(true);

  useEffect(() => {
    if (auth.reloading && AuthLoadingComp !== undefined) setIsReloading(true);
    else setIsReloading(false);
  }, [auth.reloading, AuthLoadingComp]);

  let silentSwallow = () => {};

  useEffect(() => {
    if (!FirstRun.done && locationPathName !== authCallbackRoute) {
      FirstRun.done = true;
      const onFinally = () => {
        if (onReloadFinished) onReloadFinished();
      };
      if (debug) {
        // eslint-disable-next-line no-console
        silentSwallow = console.log;
        console.log("will issue silent auth");
      }
      auth.logic
        .silent()
        .then(silentSwallow)
        .catch(silentSwallow)
        .finally(onFinally);
    }
  }, [auth.logic, authCallbackRoute, debug, locationPathName]);

  if (!FirstRun.done && AuthReloadingComp) return <AuthReloadingComp />;
  else
    return (
      <>
        {isReloading && AuthLoadingComp && <AuthLoadingComp />}
        {children}
      </>
    );
};
