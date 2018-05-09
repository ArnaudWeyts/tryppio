import { ADD_PREFERENCE, RESET_PREFERENCES } from '../actions/user';

const INITIAL_STATE = {
  preferences: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PREFERENCE:
      return {
        ...state,
        preferences: [...state.preferences, action.preference],
      };
    case RESET_PREFERENCES:
      return {
        ...state,
        preferences: [],
      };
    default:
      return state;
  }
}
