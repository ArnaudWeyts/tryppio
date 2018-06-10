import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon, Layout, DatePicker } from 'antd';
import moment from 'moment';

import './App.css';

import preferences from '../preferences.json';

import Intro from '../components/Intro';
import ActivityMap from '../components/Map';
import Overview from './Overview';

import { addPreference, resetPreferences } from '../actions/user';
import { nextQuestion, resetQuestions } from '../actions/questions';
import { routeToPage } from '../actions/routing';
import { startCalculation, setDates } from '../actions/trip';

const { Content } = Layout;
const { RangePicker } = DatePicker;

class App extends Component {
  constructor(props) {
    super(props);

    this.answerCallback = this.answerCallback.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
  }

  answerCallback(answer) {
    const { current, maxQuestions } = this.props.questions;
    if (answer) {
      this.props.addPreference(answer);
    }
    if (current + 1 === maxQuestions) {
      // ugly way to prevent calculation when not enough preferences are linked
      if (this.props.user.preferences.length < 1) {
        console.log('not enough preferences linked');
        this.props.resetPreferences();
        this.props.resetQuestions();
        this.props.routeToPage('intro');
        return;
      }
      let timeBlocks = [];
      this.props.user.preferences.forEach((pref) => {
        timeBlocks = [...timeBlocks, ...preferences.categories[pref].timeBlocks];
      });
      if (
        !(
          timeBlocks.includes('morning') &&
          timeBlocks.includes('afternoon') &&
          timeBlocks.includes('evening')
        )
      ) {
        console.log('not enough preferences for every time block');
        this.props.resetPreferences();
        this.props.resetQuestions();
        this.props.routeToPage('intro');
        return;
      }
      this.props.routeToPage('date');
    }
    this.props.nextQuestion();
  }

  dateChanged(dates, dateStrings) {
    if (dateStrings[0] === '' || dateStrings[1] === '') {
      return;
    }
    this.props.setDates(dateStrings);
    this.props.calculateTrip();
    this.props.routeToPage('overview');
  }

  render() {
    const {
      routing: { page },
      questions,
      trip,
    } = this.props;

    return (
      <div className="App">
        <Layout>
          <Content style={{ height: '100vh' }}>
            {page === 'intro' && <Intro questions={questions} answer={this.answerCallback} />}
            {page === 'date' && (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <RangePicker
                  onChange={this.dateChanged}
                  value={
                    trip.dates.arrival && [moment(trip.dates.arrival), moment(trip.dates.leave)]
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
              <ActivityMap
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

const mapStateToProps = state => ({
  user: state.user,
  routing: state.routing,
  questions: state.questions,
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  addPreference: preference => dispatch(addPreference(preference)),
  routeToPage: page => dispatch(routeToPage(page)),
  nextQuestion: () => dispatch(nextQuestion()),
  setDates: dates => dispatch(setDates(dates)),
  calculateTrip: () => dispatch(startCalculation()),
  resetPreferences: () => dispatch(resetPreferences()),
  resetQuestions: () => dispatch(resetQuestions()),
});

App.propTypes = {
  user: PropTypes.shape({
    preferences: PropTypes.array.isRequired,
  }).isRequired,
  questions: PropTypes.shape({
    current: PropTypes.number.isRequired,
    maxQuestions: PropTypes.number.isRequired,
  }).isRequired,
  addPreference: PropTypes.func.isRequired,
  routeToPage: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setDates: PropTypes.func.isRequired,
  calculateTrip: PropTypes.func.isRequired,
  resetPreferences: PropTypes.func.isRequired,
  resetQuestions: PropTypes.func.isRequired,
  routing: PropTypes.shape({
    page: PropTypes.string,
  }).isRequired,
  trip: PropTypes.shape({
    calculating: PropTypes.bool,
    dates: PropTypes.shape({
      arrival: PropTypes.string,
      leave: PropTypes.string,
    }),
    activities: PropTypes.array,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
