import FqAPIHandler from '../foursquare';
import GDAPI from '../google';

import { categories as allCategories } from '../preferences.json';

const fqAPIHandler = new FqAPIHandler(
  process.env.REACT_APP_FOURSQUARE_ID,
  process.env.REACT_APP_FOURSQUARE_SECRET,
);

const gdAPIHandler = new GDAPI();

export const TOGGLE_CALCULATING = 'TOGGLE_CALCULATING';
export const SET_DATES = 'SET_DATES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const SORT_ACTIVITIES = 'SORT_ACTIVITIES';
export const RESET_ACTIVITIES = 'RESET_ACTIVITIES';
export const ADD_TRAVEL = 'ADD_TRAVEL';

export function setDates(dates) {
  return {
    type: SET_DATES,
    dates,
  };
}

function toggleCalculating() {
  return {
    type: TOGGLE_CALCULATING,
  };
}

function addActivityToTimeBlock(timeBlock, activity) {
  return {
    type: ADD_ACTIVITY,
    timeBlock,
    activity,
  };
}

function resetActivities() {
  return {
    type: RESET_ACTIVITIES,
  };
}

function sortActivities(sortedActivities) {
  return {
    type: SORT_ACTIVITIES,
    sortedActivities,
  };
}

function addTravel(distance) {
  return {
    type: ADD_TRAVEL,
    distance,
  };
}

function determineActivity(timeBlock) {
  return (dispatch, getState) => {
    const { preferences } = getState().user;

    // Get preferences matching the timeBlock
    const timeBlockPrefs = preferences.filter(pref =>
      allCategories[pref].timeBlocks.includes(timeBlock));

    // Get a random preference
    const preference = timeBlockPrefs[Math.floor(Math.random() * timeBlockPrefs.length)];

    // Determine fq category ids for preference
    const categoryIds = allCategories[preference].ids.join(',');

    return fqAPIHandler.GetVenuesForCategoryIds(categoryIds).then((venues) => {
      // Get a random venue from list
      const venue = venues[Math.floor(Math.random() * venues.length)];

      const relevantVenueInfo = {
        name: venue.name,
        address: venue.location.address,
        lat: venue.location.lat,
        lng: venue.location.lng,
      };

      return dispatch(addActivityToTimeBlock(timeBlock, relevantVenueInfo));
    });
  };
}

function calculateDistance(ll1, ll2) {
  return gdAPIHandler.CalculateDistance(ll1, ll2);
}

export function startCalculation() {
  return (dispatch, getState) => {
    dispatch(toggleCalculating());
    dispatch(resetActivities());

    function finishActivityDetermination() {
      const sortedActivities = getState().trip.activities.sort(({ timeBlock: a }, { timeBlock: b }) => {
        if (a === 'morning' && b === 'afternoon') return 0;
        if (a === 'morning' && b === 'evening') return 0;
        if (a === 'afternoon' && b === 'morning') return 1;
        if (a === 'afternoon' && b === 'evening') return 0;
        if (a === 'evening' && b === 'morning') return 1;
        if (a === 'evening' && b === 'afternoon') return 1;

        return 0;
      });
      dispatch(sortActivities(sortedActivities));

      const { activity: activity1 } = getState().trip.activities[0];
      const { activity: activity2 } = getState().trip.activities[1];
      const { activity: activity3 } = getState().trip.activities[2];

      // Very ugly way to make sure they don't get mixed up FIX ASAP
      calculateDistance(activity1, activity2).then((resp) => {
        dispatch(addTravel(resp));
        calculateDistance(activity2, activity3).then(response => dispatch(addTravel(response)));
      });

      dispatch(toggleCalculating());
    }

    // Wait for all the promises to finish, then toggleCalculating
    // eventually determine routes between activities
    Promise.all([
      dispatch(determineActivity('morning')),
      dispatch(determineActivity('afternoon')),
      dispatch(determineActivity('evening')),
    ]).then(finishActivityDetermination);
  };
}
