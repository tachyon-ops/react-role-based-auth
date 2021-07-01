import React, { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../roles-based-auth/context'

class FirstRun {
  public static done = false
}

export const RefreshApp: React.FC<{
  locationPathName: string
  AuthReloadingComp: React.FC
  AuthLoadingComp?: React.FC
  authCallbackRoute?: string
  onRefreshFinished?: VoidFunction
  debug?: boolean
}> = ({
  children,
  locationPathName,
  AuthReloadingComp,
  AuthLoadingComp = undefined,
  authCallbackRoute,
  onRefreshFinished,
  debug = false,
}) => {
  const auth = useContext(AuthContext)
  const [isReloading, setIsReloading] = useState(true)

  useEffect(() => {
    if (auth.reloading && AuthLoadingComp !== undefined) setIsReloading(true)
    else setIsReloading(false)
  }, [auth.reloading, AuthLoadingComp])

  useEffect(() => {
    if (!FirstRun.done && locationPathName !== authCallbackRoute) {
      FirstRun.done = true

      let silentSwallowFunc = () => {}
      const onRefreshFinishedHandler = () => {
        if (debug) console.log('Finished refreshing')
        if (onRefreshFinished) onRefreshFinished()
      }
      if (debug) silentSwallowFunc = console.log
      auth.logic
        .silent()
        .then(silentSwallowFunc)
        .catch(silentSwallowFunc)
        .finally(onRefreshFinishedHandler)
    }
  }, [])

  if (!FirstRun.done && AuthReloadingComp) return <AuthReloadingComp />
  else
    return (
      <React.Fragment>
        {isReloading && AuthLoadingComp && <AuthLoadingComp />}
        {children}
      </React.Fragment>
    )
}
