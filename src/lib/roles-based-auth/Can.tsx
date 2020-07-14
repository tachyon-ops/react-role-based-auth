import React, { ReactElement } from 'react';

import { RBAuthBaseRoles, RBAuthRulesInterface } from '..';
import { AuthContext } from './context';

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
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

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
export const Can: React.FC<CanProps> = ({ role, perform, data = {}, yes = () => null, no = () => null }) => (
  <AuthContext.Consumer>{({ rules }) => (check(rules, role, perform, data) ? yes() : no())}</AuthContext.Consumer>
);
