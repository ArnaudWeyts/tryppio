import { Button } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <div>
        <h2>Sorry, we couldn't find that page 🤔</h2>
        <Link to="/">
          <Button type="primary" size="large">
            Take me to safety
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
