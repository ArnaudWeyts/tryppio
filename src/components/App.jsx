import React from 'react';
import { Button, Progress, Layout } from 'antd';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Content style={{ height: '100vh' }}>
          <div style={{
            height: '70%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <h2>I want to have an active trip mixed with sports.</h2>
          </div>
          <Button.Group size="large" style={{ height: '25%' }}>
            <Button type="primary">Yes <span role="img" aria-label="hands">🙌</span></Button>
            <Button type="primary">No <span role="img" aria-label="expressionless">😐</span></Button>
          </Button.Group>
          <div style={{
            height: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Progress className="questions-progress" percent={30} showInfo={false} style={{ width: '50vw' }} />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
