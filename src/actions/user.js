export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const SET_DATES = 'SET_DATES';

export function addPreference(preference) {
  return {
    type: ADD_PREFERENCE,
    preference,
  };
}

export function setDates(dates) {
  return {
    type: SET_DATES,
    dates,
  };
}
