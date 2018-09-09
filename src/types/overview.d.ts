import { AnyAction, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

interface IOverviewProps extends RouteComponentProps<any> {
  trip: ITrip;
  calculateTrip: () => Dispatch<AnyAction>;
  resetPreferences: () => Dispatch<AnyAction>;
  resetQuestions: () => Dispatch<AnyAction>;
}
