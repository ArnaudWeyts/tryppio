import { AnyAction } from 'redux';

import { ROUTE_TO_PAGE } from '../actions/routing';

const INITIAL_STATE = {
  page: 'intro'
};

export default function(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case ROUTE_TO_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
}
