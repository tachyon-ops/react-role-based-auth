import React from "react";
// import { Can } from 'react-rb-auth';

import { Login } from "./Login";
import { Logout } from "./Profile";
import { AppAuthContext } from "../services/AppAuthContext";

export const LoginLogout: React.FC = () => (
	// <Can role="admin" perform="dashboard-page:visit" yes={() => <Logout />} no={() => <Login />} />
	<AppAuthContext.Consumer>
		{(auth) => (
			<>
				{auth.isAuth && <Logout />}
				{!auth.isAuth && <Login />}
			</>
		)}
	</AppAuthContext.Consumer>
);
