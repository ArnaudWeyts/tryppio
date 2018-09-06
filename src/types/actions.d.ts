import {
  ADD_ACTIVITY,
  TOGGLE_CALCULATING,
  RESET_ACTIVITIES,
  SORT_ACTIVITIES,
  ADD_TRAVEL
} from '../actions/trip';

interface IAddActivityToTimeBlockAction {
  type: typeof ADD_ACTIVITY;
  timeBlock: string;
  activity: IActivity;
}

interface IToggleCalculatingAction {
  type: typeof TOGGLE_CALCULATING;
}

interface IResetActivitiesAction {
  type: typeof RESET_ACTIVITIES;
}

interface ISortActivitiesAction {
  type: typeof SORT_ACTIVITIES;
  sortedActivities: IActivities[];
}

interface IAddTravelTimesAction {
  type: typeof ADD_TRAVEL;
  index: number;
  times: string[];
}

type IActions =
  | IAddActivityToTimeBlockAction
  | IToggleCalculatingAction
  | IResetActivitiesAction
  | ISortActivitiesAction
  | IAddTravelTimesAction;
