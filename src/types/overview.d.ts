import { AnyAction, Dispatch } from 'redux';

interface IOverviewProps {
  trip: ITrip;
  calculateTrip: () => Dispatch<AnyAction>;
  resetPreferences: () => Dispatch<AnyAction>;
  resetQuestions: () => Dispatch<AnyAction>;
  routeToPage: (page: string) => Dispatch<AnyAction>;
}
