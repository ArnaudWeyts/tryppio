import { CALCULATE_TRIP, SET_DATES } from '../actions/trip';

const INITIAL_STATE = {
  calculating: false,
  dates: {
    arrival: null,
    leave: null,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALCULATE_TRIP:
      return {
        ...state,
        calculating: true,
      };
    case SET_DATES:
      return {
        ...state,
        dates: { arrival: action.dates[0], leave: action.dates[1] },
      };
    default:
      return state;
  }
}
