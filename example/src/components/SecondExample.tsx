import React from "react";
import "./SecondExample.css";

const Table: React.FC = ({ children }) => (
	<div style={{ display: "flex" }}>{children}</div>
);

export const SecondExample: React.FC = (props) => (
	<div className="SecondExample">
		<div className="SecondExample-text">
			<Table></Table>
		</div>
		<a
			className="SecondExample-github-link"
			target="_blank"
			rel="noopener noreferrer"
			href="https://github.com/nmpribeiro/react-role-based-auth/blob/master/README.md"
		>
			Documentation
		</a>
		{props.children}
	</div>
);
