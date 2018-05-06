import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, DatePicker } from 'antd';
import './App.css';

import Intro from '../components/Intro';
import Overview from './Overview';

import { addPreference } from '../actions/user';
import { routeToPage } from '../actions/routing';
import { nextQuestion } from '../actions/questions';
import { calculateTrip, setDates } from '../actions/trip';

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
      this.props.routeToPage('date');
    }
    this.props.nextQuestion();
  }

  dateChanged(dates, dateStrings) {
    this.props.setDates(dateStrings);
    this.props.calculateTrip();
    this.props.routeToPage('overview');
  }

  render() {
    const {
      routing: { page },
      questions,
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RangePicker onChange={this.dateChanged} />
              </div>
            )}
            {page === 'overview' && <Overview />}
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
});

const mapDispatchToProps = dispatch => ({
  addPreference: preference => dispatch(addPreference(preference)),
  routeToPage: page => dispatch(routeToPage(page)),
  nextQuestion: () => dispatch(nextQuestion()),
  setDates: dates => dispatch(setDates(dates)),
  calculateTrip: () => dispatch(calculateTrip()),
});

App.propTypes = {
  questions: PropTypes.shape({
    current: PropTypes.number.isRequired,
    maxQuestions: PropTypes.number.isRequired,
  }).isRequired,
  addPreference: PropTypes.func.isRequired,
  routeToPage: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setDates: PropTypes.func.isRequired,
  calculateTrip: PropTypes.func.isRequired,
  routing: PropTypes.shape({
    page: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
