import { Button, DatePicker, Icon, Layout } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
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
  }

  public answerCallback(answer: string) {
    const { current, maxQuestions } = this.props.questions;
    if (answer) {
      this.props.addPreference(answer);
    }
    if (current + 1 === maxQuestions) {
      setTimeout(() => {
        // ugly way to prevent calculation when not enough preferences are linked
        if (this.props.user.preferences.length < 1) {
          // console.log('not enough preferences linked');
          this.props.resetPreferences();
          this.props.resetQuestions();
          this.props.routeToPage('intro');
          return;
        }
        let timeBlocks: string[] = [];
        this.props.user.preferences.forEach(pref => {
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
          this.props.resetPreferences();
          this.props.resetQuestions();
          this.props.routeToPage('intro');
          return;
        }
        this.props.routeToPage('date');
      }, 50);
    } else {
      this.props.nextQuestion();
    }
  }

  public dateChanged(dates: any, dateStrings: string[]) {
    if (dateStrings[0] === '' || dateStrings[1] === '') {
      return;
    }
    this.props.setDates(dateStrings);
    this.props.calculateTrip();
    this.props.routeToPage('overview');
  }

  public render() {
    const {
      routing: { page },
      questions,
      trip
    } = this.props;

    return (
      <div className="App">
        <Layout>
          <Content style={{ height: '100vh' }}>
            {page === 'intro' && (
              <Intro questions={questions} answer={this.answerCallback} />
            )}
            {page === 'date' && (
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
                      this.props.calculateTrip();
                      this.props.routeToPage('overview');
                    }}
                  >
                    Use previous dates <Icon type="right" />
                  </Button>
                )}
              </div>
            )}
            {page === 'overview' && <Overview />}
            {page === 'map' && (
              <Map
                activities={trip.activities}
                routeToOverview={() => this.props.routeToPage('overview')}
              />
            )}
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  questions: state.questions,
  routing: state.routing,
  trip: state.trip,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction> | any) => ({
  addPreference: (preference: string) => dispatch(addPreference(preference)),
  calculateTrip: () => dispatch(startCalculation()),
  nextQuestion: () => dispatch(nextQuestion()),
  resetPreferences: () => dispatch(resetPreferences()),
  resetQuestions: () => dispatch(resetQuestions()),
  routeToPage: (page: string) => dispatch(routeToPage(page)),
  setDates: (dates: string[]) => dispatch(setDates(dates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
