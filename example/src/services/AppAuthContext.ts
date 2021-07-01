import { AuthContext, RBAuthReactContext } from "react-rb-auth";

import {
	LoginType,
	SignupType,
	HandleType,
	SilentType,
	LogoutType,
	RefreshType,
} from "./AuthApi";
import { GlobalAppApi } from "./ExternalApi";
import { UserModel } from "../models/user";
import { rules } from "../models/rules";

type GlobalApi = typeof GlobalAppApi;

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
>;
