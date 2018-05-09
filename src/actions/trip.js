import FqAPIHandler from '../foursquare';

const fqAPIHandler = new FqAPIHandler(
  process.env.REACT_APP_FOURSQUARE_ID,
  process.env.REACT_APP_FOURSQUARE_SECRET,
);

export const TOGGLE_CALCULATING = 'TOGGLE_CALCULATING';
export const SET_DATES = 'SET_DATES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const RESET_ACTIVITIES = 'RESET_ACTIVITIES';

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

function addActivity(activity) {
  return {
    type: ADD_ACTIVITY,
    activity,
  };
}

function resetActivities() {
  return {
    type: RESET_ACTIVITIES,
  };
}

function determineActivity(dispatch, timeSlot, preference) {
  fqAPIHandler.GetVenuesForPreference(preference).then((venues) => {
    // Get a random venu from list
    const venue = venues[Math.floor(Math.random() * venues.length)];

    const relevantVenueInfo = {
      name: venue.name,
      address: venue.location.address,
      lat: venue.location.lat,
      lng: venue.location.lng,
    };

    dispatch(addActivity(relevantVenueInfo));
    dispatch(toggleCalculating());
  });
}

export function startCalculation() {
  return (dispatch, getState) => {
    dispatch(toggleCalculating());
    dispatch(resetActivities());
    determineActivity(dispatch, 'morning-1', getState().user.preferences[1]);
    // determine activities syncronized, check in each activity
    // if still calculating and if last activity, toggle finished calculating
    // eventually determine routes between activities
  };
}
