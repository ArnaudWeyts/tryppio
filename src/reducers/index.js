import { combineReducers } from 'redux';
import user from './user';
import routing from './routing';
import questions from './questions';
import trip from './trip';

const rootReducer = combineReducers({
  user,
  routing,
  questions,
  trip,
});

export default rootReducer;
