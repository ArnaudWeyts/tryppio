import {
  TOGGLE_CALCULATING,
  SET_DATES,
  ADD_ACTIVITY,
  SORT_ACTIVITIES,
  RESET_ACTIVITIES,
} from '../actions/trip';

const INITIAL_STATE = {
  calculating: false,
  dates: {
    arrival: null,
    leave: null,
  },
  activities: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_CALCULATING:
      return {
        ...state,
        calculating: !state.calculating,
      };
    case SET_DATES:
      return {
        ...state,
        dates: { arrival: action.dates[0], leave: action.dates[1] },
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        activities: [
          ...state.activities,
          { activity: action.activity, timeBlock: action.timeBlock },
        ],
      };
    case RESET_ACTIVITIES:
      return {
        ...state,
        activities: [],
      };
    case SORT_ACTIVITIES:
      return {
        ...state,
        activities: action.sortedActivities,
      };
    default:
      return state;
  }
}
