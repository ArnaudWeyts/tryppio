import { Button, DatePicker, Icon, Layout } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';

import './App.css';

import preferencesJson from '../preferences.json';

import Intro from '../components/Intro';
import Map from '../components/Map';
import Overview from './Overview';

import { nextQuestion, resetQuestions } from '../actions/questions';
import { routeToPage } from '../actions/routing';
import { setDates, startCalculation } from '../actions/trip';
import { addPreference, resetPreferences } from '../actions/user';
import { IAppPropsExtended } from '../types/app';

const { Content } = Layout;
const { RangePicker } = DatePicker;

class App extends React.Component<IAppPropsExtended> {
  constructor(props: IAppPropsExtended) {
    super(props);

    this.answerCallback = this.answerCallback.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.renderIntro = this.renderIntro.bind(this);
    this.renderDates = this.renderDates.bind(this);
    this.renderMap = this.renderMap.bind(this);
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
          history.push('/intro');
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
          history.push('/intro');
          return;
        }
        history.push('/dates');
      }, 50);
    } else {
      nextQuestionDisp();
    }
  }

  public dateChanged(dates: any, dateStrings: string[]) {
    if (dateStrings[0] === '' || dateStrings[1] === '') {
      return;
    }
    this.props.setDates(dateStrings);
    this.props.calculateTripDisp();
    this.props.history.push('/overview');
  }

  public render() {
    return (
      <Layout>
        <Content style={{ height: '100vh', textAlign: 'center' }}>
          <Switch>
            <Route exact={true} path="/" render={this.renderIntro} />
            <Route path="/introduction" render={this.renderIntro} />
            <Route path="/dates" render={this.renderDates} />
            <Route path="/overview" component={Overview} />
            <Route path="/map" render={this.renderMap} />
          </Switch>
        </Content>
      </Layout>
    );
  }

  private renderIntro() {
    return (
      <Intro questions={this.props.questions} answer={this.answerCallback} />
    );
  }

  private renderDates() {
    const { trip } = this.props;
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

  private renderMap() {
    return <Map activities={this.props.trip.activities} />;
  }
}

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  routing: state.routing,
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
  routeToPage: (page: string) => dispatch(routeToPage(page)),
  setDates: (dates: string[]) => dispatch(setDates(dates))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
