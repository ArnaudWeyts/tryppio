import { AnyAction, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

interface IOverviewProps extends RouteComponentProps<any> {
  trip: ITrip;
  startCalculation: () => any;
  resetPreferences: () => { type: string };
  resetQuestions: () => { type: string };
}
