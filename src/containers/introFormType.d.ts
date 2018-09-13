import { AnyAction } from 'redux';
import { RouteComponentProps } from 'react-router';

interface IIntroFormProps extends IState, RouteComponentProps<any> {
  questionActions: {
    nextQuestion: () => any;
    resetQuestions: () => any;
  };
  tripActions: {
    setDates: (dates: string[]) => any;
    startCalculation: () => any;
  };
  userActions: {
    resetPreferences: () => any;
    addPreference: (preference: string) => any;
  };
}
