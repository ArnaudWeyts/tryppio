import { AnyAction } from 'redux';

import { NEXT_QUESTION, RESET_QUESTIONS } from '../actions/questions';
import preferencesJson from '../preferences.json';

const INITIAL_STATE = {
  current: 0,
  maxQuestions: preferencesJson.questions.length,
  progressPercent: 0
};

export default function(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case NEXT_QUESTION: {
      const { current, maxQuestions } = state;
      return {
        ...state,
        current: current + 1,
        progressPercent: 100 * ((current + 1) / maxQuestions)
      };
    }
    case RESET_QUESTIONS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
