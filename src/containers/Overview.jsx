import React from 'react';
import { Spin } from 'antd';

export default loading => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {loading && (
      <div>
        <h2 style={{ marginBottom: '3em' }}>Planning your perfect trip...</h2>
        <Spin size="large" />
      </div>
    )}
  </div>
);
