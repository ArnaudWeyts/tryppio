import { ADD_PREFERENCE, SET_DATES } from '../actions/user';

const INITIAL_STATE = {
  preferences: [],
  dates: {
    arrival: null,
    leave: null,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PREFERENCE:
      return {
        ...state,
        preferences: [...state.preferences, action.preference],
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
