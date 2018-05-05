import React from 'react';
import { Button, Progress } from 'antd';

import questionList from '../questions.json';

export default ({ questions, answer }) => (
  <div style={{ height: '100%' }}>
    <div
      style={{
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>{questionList[questions.current].name}</h2>
    </div>
    <Button.Group size="large" style={{ height: '25%' }}>
      <Button type="primary" onClick={() => answer(questionList[questions.current].preference)}>
        Yes{' '}
        <span role="img" aria-label="hands">
          🙌
        </span>
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: '#F44336', borderColor: '#F44336' }}
        onClick={() => answer(false)}
      >
        No{' '}
        <span role="img" aria-label="expressionless">
          😐
        </span>
      </Button>
    </Button.Group>
    <div
      style={{
        height: '5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Progress
        className="questions-progress"
        percent={questions.progressPercent}
        showInfo={false}
        style={{ width: '50vw' }}
      />
    </div>
  </div>
);
