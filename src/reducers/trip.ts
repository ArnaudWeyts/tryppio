import { AnyAction } from 'redux';

import {
  ADD_ACTIVITY,
  ADD_TRAVEL,
  RESET_ACTIVITIES,
  SET_DATES,
  SORT_ACTIVITIES,
  TOGGLE_CALCULATING
} from '../actions/trip';

const INITIAL_STATE = {
  activities: [],
  calculating: false,
  dates: {
    arrival: null,
    leave: null
  },
  travel: []
};

function insertItemAtIndex(array: any[], index: number, item: any) {
  const newArray = array.slice();
  newArray.splice(index, 0, item);
  return newArray;
}

export default function(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case TOGGLE_CALCULATING:
      return {
        ...state,
        calculating: !state.calculating
      };
    case SET_DATES:
      return {
        ...state,
        dates: { arrival: action.dates[0], leave: action.dates[1] }
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        activities: [
          ...state.activities,
          { activity: action.activity, timeBlock: action.timeBlock }
        ]
      };
    case RESET_ACTIVITIES:
      return {
        ...state,
        activities: [],
        travel: []
      };
    case SORT_ACTIVITIES:
      return {
        ...state,
        activities: action.sortedActivities
      };
    case ADD_TRAVEL:
      return {
        ...state,
        travel: insertItemAtIndex(state.travel, action.index, action.times)
      };
    default:
      return state;
  }
}
