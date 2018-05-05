import { combineReducers } from 'redux';
import user from './user';
import routing from './routing';
import questions from './questions';

const rootReducer = combineReducers({
  user,
  routing,
  questions,
});

export default rootReducer;
