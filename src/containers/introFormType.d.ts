import { AnyAction, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

interface IIntroFormProps extends IState, RouteComponentProps<any> {
  addPreferenceDisp: (preference: string) => Dispatch<AnyAction>;
  nextQuestionDisp: () => Dispatch<AnyAction>;
  setDates: (dates: string[]) => Dispatch<AnyAction>;
  calculateTripDisp: () => Dispatch<any>;
  resetPreferencesDisp: () => Dispatch<AnyAction>;
  resetQuestionsDisp: () => Dispatch<AnyAction>;
}
