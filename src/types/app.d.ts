import { AnyAction, Dispatch } from 'redux';

interface IAppPropsExtended extends IState {
  addPreference: (preference: string) => Dispatch<AnyAction>;
  routeToPage: (page: string) => Dispatch<AnyAction>;
  nextQuestion: () => Dispatch<AnyAction>;
  setDates: (dates: string[]) => Dispatch<AnyAction>;
  calculateTrip: () => Dispatch<any>;
  resetPreferences: () => Dispatch<AnyAction>;
  resetQuestions: () => Dispatch<AnyAction>;
}
