import React, { ReactElement } from 'react';

import type { RBAuthBaseRoles, RBAuthRulesInterface } from '..';

import { AuthContext } from '../roles-based-auth/context';

/**
 * Types
 */
type PermissionActionType = string;
type DataObject = { [key: string]: string | DataObject };

/**
 * Check function
 */
const check = <Role extends RBAuthBaseRoles>(
  rules: RBAuthRulesInterface<Role>,
  role: Role,
  action: PermissionActionType,
  data: DataObject
): boolean => {
  const permissions = rules[role];
  // role is not present in the rules
  if (!permissions) return false;

  // static rule not provided for action
  if (permissions.static && permissions.static.includes(action)) return true;

  if (permissions.dynamic) {
    const permissionCondition = permissions.dynamic[action];
    // dynamic rule not provided for action
    if (!permissionCondition) return false;
    return permissionCondition(data);
  }
  return false;
};

/**
 * Can Component
 */
interface CanProps {
  role: RBAuthBaseRoles;
  perform: PermissionActionType;
  data?: DataObject;
  yes?: () => ReactElement;
  no?: () => ReactElement;
}
export const Can: React.FC<CanProps> = ({
  role,
  perform,
  data = {},
  yes = () => null,
  no = () => null,
}) => (
  <AuthContext.Consumer>
    {({ rules }) => (check(rules, role, perform, data) ? yes() : no())}
  </AuthContext.Consumer>
);
