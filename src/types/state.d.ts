interface IState {
  questions: IQuestions;
  routing: IRouting;
  trip: ITrip;
  user: IUser;
}

interface IQuestions {
  current: number;
  maxQuestions: number;
  progressPercent: number;
}

interface IRouting {
  page: string;
}

interface ITrip {
  calculating: boolean;
  dates: {
    arrival: null | string;
    leave: null | string;
  };
  activities: IActivities[];
  travel: any[];
}

interface IActivities {
  activity: IActivity;
  timeBlock: string;
}

interface IActivity {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface IUser {
  preferences: string[];
}
