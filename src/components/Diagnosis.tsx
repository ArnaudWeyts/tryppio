import { Button, Progress } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import preferencesJson from '../preferences.json';
import { LayoutCentered } from '../shared/styles';

const { questions: questionList } = preferencesJson;

const Container = styled.div`
  height: 100%;
`;

const QuestionContainer = styled(LayoutCentered)`
  height: 70%;
`;

const Question = styled.h2`
  margin: 0 20px;
`;

const ButtonGroup = styled(Button.Group)`
  height: 25%;
`;

const NoButton = styled(Button as any)`
  background-color: #f44336;
  border-color: #f44336;
`;

const ProgressContainer = styled(LayoutCentered)`
  height: 5%;
`;

const ProgressBar = styled(Progress as any)`
  width: 50vw;

  & .ant-progress-inner {
    background-color: rgba(24, 144, 255, 0.28);
  }
`;

const Intro = ({ questions, answer }: IIntroProps) => (
  <Container>
    <QuestionContainer>
      <Question>{questionList[questions.current].name}</Question>
    </QuestionContainer>
    <ButtonGroup size="large">
      <Button
        type="primary"
        onClick={() => answer(questionList[questions.current].preference)}
      >
        Yes{' '}
        <span role="img" aria-label="hands">
          🙌
        </span>
      </Button>
      <NoButton type="primary" onClick={() => answer(false)}>
        No{' '}
        <span role="img" aria-label="expressionless">
          😐
        </span>
      </NoButton>
    </ButtonGroup>
    <ProgressContainer>
      <ProgressBar percent={questions.progressPercent} showInfo={false} />
    </ProgressContainer>
  </Container>
);

export default Intro;
