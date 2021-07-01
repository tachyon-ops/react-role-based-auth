/* eslint-disable no-console */
import React, { useContext, useState } from "react";
import { AppAuthContext } from "../services/AppAuthContext";
import { Utils } from "../services/Utils";

type RetrievedUserType = {
	nickname: string;
	date: Date;
	lastFetched: Date | null;
};

export const Logout: React.FC = () => {
	const auth = useContext(AppAuthContext);
	const logout = () =>
		auth.logic
			.logout()
			.then(() => null)
			.catch(() => null);

	const [retrievedUser, setRetrievedUser] = useState<RetrievedUserType | null>(
		null
	);

	const getUser = () => {
		auth.logic.apis.external
			.getUser()
			.then((res) =>
				setRetrievedUser({
					nickname: (res as unknown as RetrievedUserType).nickname,
					date: new Date(),
					lastFetched: retrievedUser?.date || null,
				})
			)
			.catch(console.log);
	};
	const refresh = () =>
		auth.logic.refresh().then(console.log).catch(console.log);
	return (
		<div>
			<h3>Welcome USER!</h3>
			<h5>Your name is: {auth.user.name}</h5>
			<img
				style={{ maxHeight: 100, borderRadius: 50 }}
				src={auth.user.picture}
				alt={auth.user.name}
			/>
			<h5>Your slug is: {auth.user.nickname}</h5>
			<button onClick={logout}>Logout</button>
			<div>
				<button onClick={refresh}>Refresh tokens</button>
				<button onClick={getUser}>Get user</button>
				{retrievedUser && (
					<div>
						<h3>Got user: </h3>
						<h5>{retrievedUser.nickname}</h5>
						<p>
							Last retrieved:
							{`\u0009${Utils.formatDate(retrievedUser.lastFetched)}`}
						</p>
						<p>
							Retrieved:
							{`\u0009\u0009${Utils.formatDate(retrievedUser.date)}`}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
