import React from "react";
import { useLocation } from "react-router-dom";
import { RefreshApp } from "react-rb-auth";

export const BrowserRefresh: React.FC<{
	AuthReloadingComp: React.FC;
	authCallbackRoute?: string;
}> = ({ children, AuthReloadingComp, authCallbackRoute }) => {
	const location = useLocation();
	return (
		<RefreshApp
			locationPathName={location.pathname}
			AuthReloadingComp={AuthReloadingComp}
			authCallbackRoute={authCallbackRoute}
		>
			{children}
		</RefreshApp>
	);
};
