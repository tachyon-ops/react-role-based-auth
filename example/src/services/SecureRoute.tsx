import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SecureScreen, RBAuthRedirect } from 'react-rb-auth';

/**
 * AppRedirect
 * Needed to wrap react-router-dom component
 */
const AppRedirect: RBAuthRedirect = ({ to }) => <Redirect to={to} />;

export const SecureRoute: React.FC<{
  path: string;
  Allowed: React.FC;
  NotAllowed?: React.FC;
}> = ({ path, Allowed, NotAllowed }) => (
  <Route
    to={path}
    render={() => <SecureScreen Allowed={Allowed} Redirect={AppRedirect} NotAllowed={NotAllowed} />}
  />
);
