import React from 'react'
import { Switch, Link } from 'react-router-dom'

import { Example } from './components/Example'
import { SecureRoute } from './services/SecureRoute'
import { LoginLogout } from './components/LoginLogout'
import { SecondExample } from './components/SecondExample'

const AppMenu: React.FC = ({ children }) => <div className='appMenu'>{children}</div>
const AppLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <div className='appLink'>
    <Link to={to}>{label}</Link>
  </div>
)

export const App: React.FC = () => (
  <>
    <Example />
    <div className='Example appBounding'>
      <AppMenu>
        <AppLink to='/' label='Home' />
        <AppLink to='/secure' label='Secure' />
        <AppLink to='/super-secure' label='Super Secure' />
      </AppMenu>
      <Switch>
        <SecureRoute
          path='/secure'
          Allowed={() => <h3>Secure area</h3>}
          NotAllowed={() => <h3>You are not allowed</h3>}
        />
        <SecureRoute path='/super-secure' Allowed={() => <h3>Super Secure area</h3>} />
      </Switch>
      <LoginLogout />
    </div>

    <SecondExample />
  </>
)
