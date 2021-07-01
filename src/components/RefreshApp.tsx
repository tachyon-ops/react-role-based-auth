import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../roles-based-auth/context";

class FirstRun {
	public static done = false;
}

export const RefreshApp: React.FC<{
	locationPathName: string;
	AuthReloadingComp: React.FC;
	AuthLoadingComp?: React.FC;
	authCallbackRoute?: string;
	debug?: boolean;
}> = ({
	children,
	locationPathName,
	AuthReloadingComp,
	AuthLoadingComp = undefined,
	authCallbackRoute,
	debug = false,
}) => {
	const auth = useContext(AuthContext);
	const [isReloading, setIsReloading] = useState(true);

	useEffect(() => {
		if (auth.reloading && AuthLoadingComp !== undefined) setIsReloading(true);
		else setIsReloading(false);
	}, [auth.reloading, AuthLoadingComp]);

	const silentSwallow = () => {};

	useEffect(() => {
		if (!FirstRun.done && locationPathName !== authCallbackRoute) {
			FirstRun.done = true;
			// eslint-disable-next-line no-console
			if (debug) {
				console.log("will issue silent auth");
				auth.logic.silent().then(console.log).catch(console.log);
			} else auth.logic.silent().then(silentSwallow).catch(silentSwallow);
		}
	}, []);

	if (!FirstRun.done && AuthReloadingComp) return <AuthReloadingComp />;
	else
		return (
			<React.Fragment>
				{isReloading && AuthLoadingComp && <AuthLoadingComp />}
				{children}
			</React.Fragment>
		);
};
