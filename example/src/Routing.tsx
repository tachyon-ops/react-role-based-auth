import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SecureScreen } from 'react-rb-auth';

const SecureArea = () => <h3>Secure area</h3>;
const SuperSecureArea = () => <h3>Super Secure area</h3>;
const YouAreNotAllowed = () => <h3>You are not allowed</h3>;

export const Routing = () => {
  const nav = useNavigate();
  const onSuperSecure = () => nav('/secure');
  return (
    <Routes>
      <Route
        path='/secure'
        element={<SecureScreen Allowed={<SecureArea />} NotAllowed={<YouAreNotAllowed />} />}
      />
      <Route
        path='/super-secure'
        element={<SecureScreen Allowed={<SuperSecureArea />} onSecureScreen={onSuperSecure} />}
      />
    </Routes>
  );
};
