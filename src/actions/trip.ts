import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  IActions,
  IAddActivityToTimeBlockAction,
  IAddTravelTimesAction,
  IResetActivitiesAction,
  ISortActivitiesAction,
  IToggleCalculatingAction
} from '../types/actions';

import FoursquareAPI from '../FoursquareAPI';
import GoogleAPI from '../GoogleAPI';

import preferencesJson from '../preferences.json';

const allCategories = preferencesJson.categories;

const fqAPIHandler = new FoursquareAPI(
  process.env.REACT_APP_FOURSQUARE_ID || '',
  process.env.REACT_APP_FOURSQUARE_SECRET || ''
);

const gdAPIHandler = new GoogleAPI();

export const TOGGLE_CALCULATING = 'TOGGLE_CALCULATING';
export const SET_DATES = 'SET_DATES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const SORT_ACTIVITIES = 'SORT_ACTIVITIES';
export const RESET_ACTIVITIES = 'RESET_ACTIVITIES';
export const ADD_TRAVEL = 'ADD_TRAVEL';

export function setDates(dates: string[]) {
  return {
    dates,
    type: SET_DATES
  };
}

function toggleCalculating(): IToggleCalculatingAction {
  return {
    type: TOGGLE_CALCULATING
  };
}

function addActivityToTimeBlock(
  timeBlock: string,
  activity: IActivity
): IAddActivityToTimeBlockAction {
  return {
    activity,
    timeBlock,
    type: ADD_ACTIVITY
  };
}

function resetActivities(): IResetActivitiesAction {
  return {
    type: RESET_ACTIVITIES
  };
}

function sortActivities(
  sortedActivities: IActivities[]
): ISortActivitiesAction {
  return {
    sortedActivities,
    type: SORT_ACTIVITIES
  };
}

function addTravelTimes(index: number, times: string[]): IAddTravelTimesAction {
  return {
    index,
    times,
    type: ADD_TRAVEL
  };
}

/**
 * Determines an activity for a timebock
 * @param {String} timeBlock timeblock
 * @returns {Promise}
 */
function determineActivity(
  timeBlock: string
): ThunkAction<
  Promise<IActions>,
  IState,
  undefined,
  IAddActivityToTimeBlockAction
> {
  return (dispatch: Dispatch<IActions>, getState: () => IState) => {
    const { preferences } = getState().user;

    // Get preferences matching the timeBlock
    const timeBlockPrefs = preferences.filter(pref =>
      allCategories[pref].timeBlocks.includes(timeBlock)
    );

    // Get a random preference
    const preference =
      timeBlockPrefs[Math.floor(Math.random() * timeBlockPrefs.length)];

    // Determine fq category ids for preference
    const categoryIds = allCategories[preference].ids.join(',');

    return fqAPIHandler.getVenuesForCategoryIds(categoryIds).then(venues => {
      // Get a random venue from list
      const venue = venues[Math.floor(Math.random() * venues.length)];

      const relevantVenueInfo = {
        address: venue.location.address,
        lat: venue.location.lat,
        lng: venue.location.lng,
        name: venue.name
      };

      return dispatch(addActivityToTimeBlock(timeBlock, relevantVenueInfo));
    });
  };
}

function calculateTime(
  ll1: { lat: number; lng: number },
  ll2: { lat: number; lng: number },
  travelMode: string[]
) {
  return gdAPIHandler.calculateTime(ll1, ll2, travelMode);
}

export function startCalculation() {
  return (
    dispatch: ThunkDispatch<IState, undefined, AnyAction>,
    getState: () => IState
  ) => {
    dispatch(toggleCalculating());
    dispatch(resetActivities());

    function finishActivityDetermination() {
      const sortedActivities = getState().trip.activities.sort(
        ({ timeBlock: a }, { timeBlock: b }) => {
          if (a === 'morning' && b === 'afternoon') return 0;
          if (a === 'morning' && b === 'evening') return 0;
          if (a === 'afternoon' && b === 'morning') return 1;
          if (a === 'afternoon' && b === 'evening') return 0;
          if (a === 'evening' && b === 'morning') return 1;
          if (a === 'evening' && b === 'afternoon') return 1;

          return 0;
        }
      );

      // Sort activities
      dispatch(sortActivities(sortedActivities));

      const { activity: activity1 } = getState().trip.activities[0];
      const { activity: activity2 } = getState().trip.activities[1];
      const { activity: activity3 } = getState().trip.activities[2];

      const travelTime1 = () =>
        calculateTime(activity1, activity2, ['WALKING', 'TRANSIT']).then(resp =>
          dispatch(addTravelTimes(0, resp))
        );
      const travelTime2 = () =>
        calculateTime(activity2, activity3, ['WALKING', 'TRANSIT']).then(resp =>
          dispatch(addTravelTimes(1, resp))
        );

      // Wait for traveltimes to be calculated before toggling
      return Promise.all([travelTime1(), travelTime2()]).then(() => {
        dispatch(toggleCalculating());
      });
    }

    // Wait for all the promises to finish, then toggleCalculating
    // eventually determine routes between activities
    return Promise.all([
      dispatch(determineActivity('morning')),
      dispatch(determineActivity('afternoon')),
      dispatch(determineActivity('evening'))
    ]).then(finishActivityDetermination);
  };
}
