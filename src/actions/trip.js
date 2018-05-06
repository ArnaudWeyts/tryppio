export const CALCULATE_TRIP = 'CALCULATE_TRIP';
export const SET_DATES = 'SET_DATES';

export function setDates(dates) {
  return {
    type: SET_DATES,
    dates,
  };
}

export function calculateTrip() {
  return {
    type: CALCULATE_TRIP,
  };
}
