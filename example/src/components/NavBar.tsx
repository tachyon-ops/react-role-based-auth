import React from 'react';
import { Link } from 'react-router-dom';

const AppMenu: React.FC = ({ children }) => <div className='appMenu'>{children}</div>;
const AppLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <div className='appLink'>
    <Link to={to}>{label}</Link>
  </div>
);

export const NavBar = () => (
  <AppMenu>
    <AppLink to='/' label='Home' />
    <AppLink to='/secure' label='Secure' />
    <AppLink to='/super-secure' label='Super Secure' />
  </AppMenu>
);
