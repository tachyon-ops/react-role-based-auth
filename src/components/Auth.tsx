import React, { useEffect } from 'react'

import { RBAuthErrors } from '../rb-auth-errors'
import { BaseAuthApiWrapper } from '../authServices/BaseAuthApiWrapper'
import { AuthContext, RBAuthInitialUser } from '../roles-based-auth/context'
import { PartialAuthApi, RBAuthUserModelWithRole, RBAuthBaseRoles, RBAuthContextType } from '..'

export const Auth: React.FC<{
  authApi: PartialAuthApi
  routes?: { private: string; public: string }
  onAuthExpired?: (e: RBAuthErrors) => void
  appApis?: Record<string, unknown>
  monitorUserChanges?: null | ((user: RBAuthUserModelWithRole<RBAuthBaseRoles> | null) => void)
}> = ({ children, authApi, routes, onAuthExpired, appApis = {}, monitorUserChanges = null }) => {
  const [reloading, setReloading] = React.useState(true)
  const [user, setUser] = React.useState<RBAuthUserModelWithRole<RBAuthBaseRoles> | null>(null)

  const logic = new BaseAuthApiWrapper(setReloading, setUser, authApi, onAuthExpired, appApis)

  useEffect(() => {
    if (monitorUserChanges) monitorUserChanges(user)
  }, [user])

  const contextVal: RBAuthContextType = {
    isAuth: !!(user && user.role && user.role !== 'public'),
    reloading,
    logic,
    routes: { private: routes?.private || '/private', public: routes?.public || '/' },
    user: user || RBAuthInitialUser,
    rules: {
      admin: {},
      public: {},
    },
  }

  return <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
}
