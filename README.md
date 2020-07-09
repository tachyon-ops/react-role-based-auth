# React Role Based Auth

Role based auth for redux

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

### Context handling

This library supplies you with a context to handle all Authentication state in the whole app for you. You will need to construct an AuthClass where you manage all your Authentication logic.

#### Your Auth class

This library can't know your `UserModel` nor how your backend expects auth to work out, so you will have to create a class for all your `Auth` logic:

```typescript
import React, { useState } from 'react';

import { UserModel, anonUser, regUser } from '../models/user';
import { AppAuthContext } from './AppAuthContext';

const Auth: React.FC = ({ children }) => {
  const [authenticated, setAuth] = useState(false);
  const [user, setUser] = useState<UserModel>(anonUser);

  const login = () => {
    setAuth(true);
    setUser(regUser);
  };
  const logout = () => {
    setAuth(false);
    setUser(anonUser);
  };

  const setupAuthVal = () => ({
    authenticated,
    reloading: false,
    accessToken: 'is_it_an_access_token?',
    login: login,
    logout: logout,
    handleAuthentication: () => null,
    silentAuth: () => null,
    routes: {
      public: '/',
      private: '/admin',
    },
    user,
  });

  return <AppAuthContext.Provider value={setupAuthVal()}>{children}</AppAuthContext.Provider>;
};

export default Auth;
```

`BrowserRefresh` logic can be seen on the accompaning `src/demo` sample App.

Then in your `index.tsx` or `app.tsx`, whatever suits you best, under your redux provider, add the following to your react entry poing (`Auth` is our previously created app code):

```typescript
ReactDOM.render(
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
  </Provider>,
  document.getElementById('root')
);
```

#### User model

But wait, the context `AuthContext` from `import { AuthContext } from 'react-rb-auth';` has no idea about your `UserModel`, so whenever you want to reach your user attributes throughout your codebase, provided `Auth` has been introduced in the DOM tree (usually under your redux store provider), you will need to have the following type casted onto a "custom" `AppAuthContext` of your own:

```typescript
import { AuthContext, RBAuthContextType } from 'react-rb-auth';
import { UserModel } from '../models/user';

export const AppAuthContext = AuthContext as React.Context<RBAuthContextType<UserModel>>;
```

In this case, `UserModel` is simply an interface `{ name: string, role: BaseRole }` (notice the extra `name` in the Object), being `RBAuthUserModel` imported from `react-rb-auth` lib.

TODO Note: extending 'roles' to be done.

```typescript
import { RBAuthUserModel } from 'react-rb-auth';

export interface UserModel extends RBAuthUserModel {
  name: string;
}

export const anonUser: UserModel = { name: '', role: 'visitor' };
export const regUser: UserModel = { name: 'Role Based Auth', role: 'admin' };
```

Now you can use your context like follows, where we combined everything to let you see that even access to `login` and `logout` functionality is in the context.

```typescript
import React from 'react';

import { AppAuthContext } from '../services/AppAuthContext';

export const LoginLogout: React.FC = (props) => (
  <AppAuthContext.Consumer>
    {(authContext) => (
      <div>
        {!authContext.authenticated && (
          <div>
            <h3>You are anonymous</h3>
            <button onClick={authContext.login}>Login</button>
          </div>
        )}
        {authContext.authenticated && (
          <div>
            <h3>Welcome USER!</h3>
            <h5>Your name is: {authContext.user.name}</h5>
            <button onClick={authContext.logout}>Logout</button>
          </div>
        )}
        <br />
        <br />
      </div>
    )}
  </AppAuthContext.Consumer>
);
```

## Roles

- TODO

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the library in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test` or `yarn run test`

Runs the test watcher in an interactive mode.

### `npm run build` or `yarn build`

Builds the library for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm publish`

Publishes the library to NPM.

## Typescript

[Adding Typescript support](https://gist.github.com/DimiMikadze/f25e1c5c70fa003953afd40fa9042517)

## I want to help

### Help with work

Just fork and do a PR :) I will add you to the colaborators list with a BIG thank you!

- If you want to buy me a coffee or a beer as a thank you, I'm very much appreciated :stuck_out_tongue_winking_eye: [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D3J2WXTXLAWK8&source=url)

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
