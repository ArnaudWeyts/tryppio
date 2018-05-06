import React from 'react';
import PropTypes from 'prop-types';
import { Button, Progress } from 'antd';

import prefs from '../preferences.json';

const { questions: questionList } = prefs;

const Intro = ({ questions, answer }) => (
  <div style={{ height: '100%' }}>
    <div
      style={{
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2 style={{ margin: '0 20px' }}>{questionList[questions.current].name}</h2>
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

Intro.propTypes = {
  questions: PropTypes.shape({
    current: PropTypes.number.isRequired,
    maxQuestions: PropTypes.number.isRequired,
  }).isRequired,
  answer: PropTypes.func.isRequired,
};

export default Intro;
