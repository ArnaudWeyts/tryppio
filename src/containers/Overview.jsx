import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { resetQuestions } from '../actions/questions';
import { resetPreferences } from '../actions/user';
import { startCalculation } from '../actions/trip';
import { routeToPage } from '../actions/routing';

import Trip from '../components/Trip';

class Overview extends Component {
  constructor(props) {
    super(props);

    this.resetPreferences = this.resetPreferences.bind(this);
  }

  resetPreferences() {
    this.props.resetPreferences();
    this.props.resetQuestions();
    this.props.routeToPage('intro');
  }

  render() {
    const { trip, routeToPage } = this.props;
    return (
      <div style={{ padding: '2em', height: '100%' }}>
        {trip.calculating && (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h2 style={{ marginBottom: '3em' }}>Planning your perfect trip...</h2>
            <Spin size="large" />
          </div>
        )}
        {!trip.calculating && (
          <Trip
            trip={trip}
            calculate={() => routeToPage('date')}
            reset={this.resetPreferences}
            routeToMap={() => routeToPage('map')}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  routeToPage: page => dispatch(routeToPage(page)),
  calculateTrip: () => dispatch(startCalculation()),
  resetPreferences: () => dispatch(resetPreferences()),
  resetQuestions: () => dispatch(resetQuestions()),
});

Overview.propTypes = {
  trip: PropTypes.shape({
    calculating: PropTypes.bool,
    dates: PropTypes.shape({
      arrival: PropTypes.string,
      leave: PropTypes.string,
    }),
    activities: PropTypes.array,
  }).isRequired,
  routeToPage: PropTypes.func.isRequired,
  resetPreferences: PropTypes.func.isRequired,
  resetQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
