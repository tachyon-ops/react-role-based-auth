import React from 'react';
import './SecondExample.css';

const SecondExample: React.FC = (props) => (
  <div className="SecondExample">
    <p className="SecondExample-text">
      Based on Facebook's {'\u00A0'}
      <a
        className="SecondExample-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/facebookincubator/create-react-app"
      >
        Create react app
      </a>
    </p>
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

export default SecondExample;
