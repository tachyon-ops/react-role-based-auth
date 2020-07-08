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

This library supplies you with a context to handle all Authentication state in the whole app for you. As such, you must create an `Auth` component using the following code as a guideline:

```typescript
import React, { useState } from 'react';
import { getAuthContext } from 'react-rb-auth';

import { UserModel } from '../models/user';

export const AppAuthContext = getAuthContext<UserModel>();

const regUser: UserModel = {
  name: 'Registered user name',
  role: 'admin',
};
const anonUser: UserModel = {
  name: '',
  role: 'visitor',
};

export const Auth: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserModel>(anonUser);

  const initiateLogin = () => {
    setAuthenticated(true);
    setUser(regUser);
  };
  const logout = () => {
    setAuthenticated(false);
    setUser(anonUser);
  };

  return (
    <AppAuthContext.Provider
      value={{
        authenticated,
        reloading: false,
        accessToken: 'is_it_an_access_token?',
        initiateLogin,
        handleAuthentication: () => null,
        silentAuth: () => null,
        logout,
        routes: {
          public: '/',
          private: '/counter',
        },
        user,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};
```

In this case, `UserModel` is simply an interface `{ name: string, role: BaseRole }`, being `BaseRole` imported from `react-rb-auth` lib.
`UserModel` must `InitialUserType<BaseRoles>`:

```typescript
export interface UserModel extends InitialUserType<BaseRoles> {
  name: string;
  role: 'admin' | 'visitor';
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
);
```

Now you can use your context like so:

```typescript
<AppAuthContext.Consumer>
  {(context) => (
    <div>
      {!context.authenticated && (
        <>
          <h3>You are anonymous</h3>
          <button onClick={props.login}>Login</button>
        </>
      )}
      {context.authenticated && (
        <>
          <h3>Welcome USER!</h3>
          <p>Your name is: {context.user.name}</p>
          <button onClick={props.logout}>Logout</button>
        </>
      )}
    </div>
  )}
</AppAuthContext.Consumer>
```

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

## Wanna help

Just fork and do a PR :) I will add you to the colaborators list with a BIG thank you!

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
