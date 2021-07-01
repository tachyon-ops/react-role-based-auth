import React from "react";
import udiliaLogo from "./udilia-logo.svg";
import "./Example.css";

export const Example: React.FC = (props) => (
	<div className="Example">
		{props.children}
		<img src={udiliaLogo} alt="React logo" width="62" />
		<h1 className="Example-text">React Role Based Auth Library</h1>
	</div>
);
