import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '..';

export const RefreshApp: React.FC<{
  locationPathName: string;
  AuthReloadingComp: React.FC;
  AuthLoadingComp?: React.FC;
  authCallbackRoute?: string;
}> = (props) => {
  const auth = useContext(AuthContext);
  const [firstAuthCheck, setFirstAuthCheck] = useState(true);
  const [isReloading, setIsReloading] = useState(true);

  useEffect(() => {
    if (auth.reloading && props.AuthLoadingComp !== undefined) setIsReloading(true);
    else setIsReloading(false);
  }, [auth.reloading, props.AuthLoadingComp]);

  useEffect(() => {
    if (firstAuthCheck) {
      if (props.locationPathName !== props.authCallbackRoute) {
        auth.logic
          .silent()
          .then(console.log)
          .catch(console.log)
          .finally(() => setFirstAuthCheck(false));
      } else setFirstAuthCheck(false);
    }
  }, [firstAuthCheck]);

  if (firstAuthCheck) return <props.AuthReloadingComp />;
  else
    return (
      <>
        {isReloading && <props.AuthLoadingComp />}
        {props.children}
      </>
    );
};
