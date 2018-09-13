import { Button } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { LayoutCentered } from '../shared/styles';

const NoMatch = () => {
  return (
    <LayoutCentered>
      <h2>Sorry, we couldn't find that page 🤔</h2>
      <Link to="/">
        <Button type="primary" size="large">
          Take me to safety
        </Button>
      </Link>
    </LayoutCentered>
  );
};

export default NoMatch;
