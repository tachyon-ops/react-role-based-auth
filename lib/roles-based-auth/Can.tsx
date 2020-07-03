import React, { ReactElement } from 'react';

import { rules as rbacRules, BaseRoles } from './rbac-rules';

/**
 * Types
 */
type Permission = { static?: string[]; dynamic?: { [key: string]: Function } };
type RuleType<Role extends BaseRoles> = { [key in Role]: Permission };
type PermissionActionType = string;
type DataType = { [key: string]: string | DataType };

/**
 * Check function
 */
const check = <Role extends BaseRoles>(
    rules: RuleType<Role>,
    role: Role,
    action: PermissionActionType,
    data: unknown
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
    role: BaseRoles;
    perform: PermissionActionType;
    data?: DataType;
    yes?: () => ReactElement;
    no?: () => ReactElement;
}
export const Can: React.FC<CanProps> = ({ role, perform, data = {}, yes = () => null, no = () => null }) => {
    return check(rbacRules, role, perform, data) ? yes() : no();
};
