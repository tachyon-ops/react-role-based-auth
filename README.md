# React Role Based Auth

Role based auth for redux. Have a look here: [nmpribeiro.github.io/react-role-based-auth](https://nmpribeiro.github.io/react-role-based-auth/) - login with user: example@example.com pass: test_2021 on browser refresh, your sessions will persist on reload

## Usage

### Setting up the lib

First, setup your auth mechanism and backend.

## Installation

`npm install react-rb-auth`
or
`yarn add react-rb-auth`

All library files are located inside **src/lib** folder.

Inside **src/demo** folder, you can test your library while developing.

## How to use

### Main and App from example

Our `Main` encapsulates all necessary Auth bootstrapping, including setting the `TokenUtil` storage (this allows implementation decoupling for `localStorage` in browsers or `async storage` in mobile react-native apps), `AuthApi`, `AuthReloading` for when you are reloading the app (refresh), `AuthLoading` for when your are loggin in, and other auth specific utilities.

```typescript
import React, { useEffect, useState } from 'react'
import { Auth, TokenUtil, RefreshApp, RBAuthErrors } from 'react-rb-auth'

import { App } from './App'
import { AuthApi } from './services/AuthApi'
import { GlobalAppApi } from './services/ExternalApi'
import { AppStorage } from './services/AppLocalStorage'

const AuthReloading: React.FC = () => (
  <Spinner>
    <h3>AuthReloading</h3>
  </Spinner>
)
const AuthLoading: React.FC = () => (
  <Spinner>
    <h3>AuthLoading</h3>
  </Spinner>
)
const Spinner: React.FC = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }}
  >
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </div>
  </div>
)

export const Main: React.FC = () => {
  const [initiated, setInitiated] = useState(false)

  useEffect(() => {
    TokenUtil.setStorage(new AppStorage(setInitiated))
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('is initiated: ', initiated)
  }, [initiated])

  const onAuthExpired = (errorMsg: RBAuthErrors, error?: Error) =>
    setTimeout(() => {
      alert(errorMsg)
      // eslint-disable-next-line no-console
      error && console.log(error)
    })

  if (!initiated) return <></>

  return (
    <Auth
      authApi={AuthApi}
      routes={{ private: '/super-secure', public: '/' }}
      onAuthExpired={onAuthExpired}
      appApis={GlobalAppApi}
    >
      <RefreshApp
        locationPathName={'none'}
        AuthReloadingComp={AuthReloading}
        AuthLoadingComp={AuthLoading}
      >
        <App />
      </RefreshApp>
    </Auth>
  )
}
```

Now, in your `App` you can have the following snippet:

```typescript
<BrowserRefresh AuthReloadingComp={Reloading}>
  <Switch>
    <SecureRoute
      path='/secure'
      Allowed={() => <h3>Secure area</h3>}
      NotAllowed={() => <h3>You are not allowed</h3>}
    />

    <SecureRoute path='/super-secure' Allowed={() => <h3>Super Secure area</h3>} />
  </Switch>
  <LoginLogout />
</BrowserRefresh>
```

Be sure you imported `import { Switch } from 'react-router-dom';`.

`BrowserRefresh` logic:

```typescript
import React from 'react'
import { useLocation } from 'react-router-dom'
import { RefreshApp } from 'react-rb-auth'

export const BrowserRefresh: React.FC<{
  AuthReloadingComp: React.FC
  authCallbackRoute?: string
}> = ({ children, AuthReloadingComp, authCallbackRoute }) => {
  const location = useLocation()
  return (
    <RefreshApp
      locationPathName={location.pathname}
      AuthReloadingComp={AuthReloadingComp}
      authCallbackRoute={authCallbackRoute}
    >
      {children}
    </RefreshApp>
  )
}
```

Then in your `index.tsx` or `app.tsx`, whatever suits you best, under your redux provider, add the following to your react entry poing (`Auth` is our previously created app code):

```typescript
ReactDOM.render(
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
  </Provider>,
  document.getElementById('root')
)
```

### Context handling

This library supplies you with a context to handle all Authentication state in the whole app for you. You will need to construct an AuthClass where you manage all your Authentication logic.

#### Your Auth class and the User model

The context `AuthContext` from `import { AuthContext } from 'react-rb-auth';` has no idea about your specific `UserModel`, so whenever you want to reach your user attributes throughout your codebase, provided `Auth` has been introduced in the DOM tree (usually under your redux store provider), you will need to have the following type casted onto a "custom" `AppAuthContext` of your own:

```typescript
import { AuthContext, RBAuthReactContext } from 'react-rb-auth'

import { LoginType, SignupType, HandleType, SilentType, LogoutType, RefreshType } from './AuthApi'
import { GlobalAppApi } from './ExternalApi'
import { UserModel } from '../models/user'
import { rules } from '../models/rules'

type GlobalApi = typeof GlobalAppApi

export const AppAuthContext = AuthContext as RBAuthReactContext<
  UserModel,
  typeof rules,
  LoginType,
  LogoutType,
  SignupType,
  HandleType,
  SilentType,
  RefreshType,
  GlobalApi
>
```

```typescript
import { RBAuthUserModel } from 'react-rb-auth'

export interface UserModel extends RBAuthUserModel {
  name: string
}

export const anonUser: UserModel = { name: '', role: 'visitor' }
export const regUser: UserModel = { name: 'Role Based Auth', role: 'admin' }
```

### AppAuthContext Types

- You will have to define your own `UserModel` (it follows an example). In this case, `UserModel` is simply an interface `{ name: string, role: AppRole }` (notice the extra `name` in the Object), being `RBAuthUserModel` imported from `react-rb-auth` lib.

```typescript
import { RBAuthUserModelWithRole } from 'react-rb-auth'
import { AppRole } from './role'

export interface UserModel extends RBAuthUserModelWithRole<AppRole> {
  name: string
  role: AppRole
}

export const anonUser: UserModel = {
  name: '',
  role: 'public',
}
```

`AppRole`:

```typescript
import { RBAuthBaseRoles } from 'react-rb-auth'

export type AppRole = 'writer' | RBAuthBaseRoles
```

- typeof rules, where `rules` is of type `RBAuthRulesInterface<AppRole>`
- `LoginType`, `LogoutType`, `SignupType`, `HandleType`, `SilentType`, `RefreshType` are all the necessary function types for the auth API (look at `AuthApi.ts` file for an example as they are derived from the necessary Tokens and User type this library uses).
- `GlobalApi` is a dictionary of multiple APIs. While it is still a WIP, it is being developed to allow us to catch any 'unauthorized' loggin in order for the AuthContext to automatically handle the error. You can override this by using your own apis and handling the exceptions yourself, while if the user is not authorized, you just need to log him out yourself.

Now you can use your context like follows, where we combined everything to let you see that even access to `login` and `logout` functionality is in the context. Notice the commented out `Can` usage here.

```typescript
import React from 'react'
// import { Can } from 'react-rb-auth';

import { Login } from './Login'
import { Logout } from './Profile'
import { AppAuthContext } from '../services/AppAuthContext'

export const LoginLogout: React.FC = () => (
  // <Can role="admin" perform="dashboard-page:visit" yes={() => <Logout />} no={() => <Login />} />
  <AppAuthContext.Consumer>
    {(auth) => (
      <>
        {auth.isAuth && <Logout />}
        {!auth.isAuth && <Login />}
      </>
    )}
  </AppAuthContext.Consumer>
)
```

## Roles

- [ ] TODO: further implement this. A basic implementation is underway and could be used with `Can` component.

## Available Scripts

In the project directory, you can run:

### `yarn start-lib`

Builds the library code.

### `yarn start`

Builds the library code (`yarn prepare`), then builds the example app (`yarn predeploy`) and finally it deploys the app to GitHub pages (`yarn deploy`).

### Start example

```bash
# (in another tab)

cd example
npm start # runs create-react-app dev server
```

### `yarn test` `yarn test:watch`

Runs the test watcher in an interactive mode.

### `npm publish`

Publishes the library to NPM.

## I want to help

### Help with work

Just fork and do a PR :) I will add you to the colaborators list with a BIG thank you!

- If you want to buy me a coffee or a beer as a thank you, I'm very much appreciated :stuck_out_tongue_winking_eye: [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D3J2WXTXLAWK8&source=url)

## Roadmap

### TODO list

- [ ] Properly setup Roles
- [x] ~~RequestBuilder timeout [Fetch with timeout](https://dmitripavlutin.com/timeout-fetch-request/) ~~

### Guidelines

Whenever a new `master` is deployed, it should be tagged with the new deployed version.
After we reach version 1.0.0 as the first release (production ready). After that, we follow semantic versioning.

### Publishing

Remember to always publish on a merge request. Pipeline `master:only` actions will be created in the future, once we stabilize this library.

Enjoy!

## Troubleshooting

### Usage of other libraries within your library

- Add the library as a peer dependency in package.json (effectively requiring the calling project to provide this dependency)
- Add the library as a dev dependency in package.json (effectively allowing this library to successfully build without complaining about not having this dependency)
- Add the library to the externals config in your webpack.config file(s). By default, only react and react-dom are there, meaning that those are the only two libraries that you can use within your new shared library.

## Credits

This project was bootstrapped with [Create React Library](https://github.com/dimimikadze/create-react-library).
