import { Button, DatePicker, Icon } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';

import Diagnosis from '../components/Diagnosis';

import preferencesJson from '../preferences.json';

import { nextQuestion, resetQuestions } from '../actions/questions';
import { setDates, startCalculation } from '../actions/trip';
import { addPreference, resetPreferences } from '../actions/user';

import NoMatch from '../components/NoMatch';
import { IIntroFormProps } from './introFormType';

const { RangePicker } = DatePicker;

class IntroForm extends React.Component<IIntroFormProps> {
  constructor(props: IIntroFormProps) {
    super(props);

    this.answerCallback = this.answerCallback.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.renderDiagnosis = this.renderDiagnosis.bind(this);
    this.renderDates = this.renderDates.bind(this);
  }

  public dateChanged(dates: any, dateStrings: string[]) {
    if (dateStrings[0] === '' || dateStrings[1] === '') {
      return;
    }
    this.props.setDates(dateStrings);
    this.props.calculateTripDisp();
    this.props.history.push('/overview');
  }

  public answerCallback(answer: string) {
    const {
      questions: { current, maxQuestions },
      user,
      history,
      addPreferenceDisp,
      resetPreferencesDisp,
      resetQuestionsDisp,
      nextQuestionDisp
    } = this.props;

    if (answer) {
      addPreferenceDisp(answer);
    }
    if (current + 1 === maxQuestions) {
      setTimeout(() => {
        // ugly way to prevent calculation when not enough preferences are linked
        if (user.preferences.length < 1) {
          // console.log('not enough preferences linked');
          resetPreferencesDisp();
          resetQuestionsDisp();
          history.push('/form/diagnosis');
          return;
        }
        let timeBlocks: string[] = [];
        user.preferences.forEach(pref => {
          timeBlocks = [
            ...timeBlocks,
            ...preferencesJson.categories[pref].timeBlocks
          ];
        });
        if (
          !(
            timeBlocks.includes('morning') &&
            timeBlocks.includes('afternoon') &&
            timeBlocks.includes('evening')
          )
        ) {
          // console.log('not enough preferences for every time block');
          resetPreferencesDisp();
          resetQuestionsDisp();
          history.push('/form/diagnosis');
          return;
        }
        history.push('/form/dates');
      }, 50);
    } else {
      nextQuestionDisp();
    }
  }

  public render() {
    return (
      <Switch>
        <Redirect from="/form" exact={true} to="/form/diagnosis" />
        <Route path="/form/diagnosis" render={() => this.renderDiagnosis()} />
        <Route path="/form/dates" render={this.renderDates} />
        <Route component={NoMatch} />
      </Switch>
    );
  }

  private renderDiagnosis() {
    return (
      <Diagnosis
        questions={this.props.questions}
        answer={this.answerCallback}
      />
    );
  }

  private renderDates() {
    const { trip } = this.props;

    if (this.props.user.preferences.length < 1) {
      return <Redirect to="/" />;
    }

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <RangePicker
          onChange={this.dateChanged}
          value={
            (trip.dates.arrival &&
              trip.dates.leave && [
                moment(trip.dates.arrival),
                moment(trip.dates.leave)
              ]) ||
            undefined
          }
        />
        {trip.dates.arrival && (
          <Button
            style={{ marginTop: '1em' }}
            type="primary"
            size="large"
            onClick={() => {
              this.props.calculateTripDisp();
              this.props.history.push('/overview');
            }}
          >
            Use previous dates <Icon type="right" />
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  trip: state.trip,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction> | any) => ({
  addPreferenceDisp: (preference: string) =>
    dispatch(addPreference(preference)),
  calculateTripDisp: () => dispatch(startCalculation()),
  nextQuestionDisp: () => dispatch(nextQuestion()),
  resetPreferencesDisp: () => dispatch(resetPreferences()),
  resetQuestionsDisp: () => dispatch(resetQuestions()),
  setDates: (dates: string[]) => dispatch(setDates(dates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroForm);
