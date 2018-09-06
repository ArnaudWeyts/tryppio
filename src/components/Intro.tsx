import { Button, Progress } from 'antd';
import * as React from 'react';

import preferencesJson from '../preferences.json';

const { questions: questionList } = preferencesJson;

const Intro = ({ questions, answer }: IIntroProps) => (
  <div style={{ height: '100%' }}>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '70%',
        justifyContent: 'center'
      }}
    >
      <h2 style={{ margin: '0 20px' }}>
        {questionList[questions.current].name}
      </h2>
    </div>
    <Button.Group size="large" style={{ height: '25%' }}>
      <Button
        type="primary"
        onClick={() => answer(questionList[questions.current].preference)}
      >
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
        alignItems: 'center',
        display: 'flex',
        height: '5%',
        justifyContent: 'center'
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

export default Intro;
