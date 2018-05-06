import { CALCULATE_TRIP } from '../actions/trip';

const INITIAL_STATE = {
  calculating: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALCULATE_TRIP:
      return {
        ...state,
        calculating: true,
      };
    default:
      return state;
  }
}
