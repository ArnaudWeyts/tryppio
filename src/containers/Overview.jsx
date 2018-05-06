import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { routeToPage } from '../actions/routing';

import Trip from '../components/Trip';

class Overview extends Component {
  render() {
    const { trip } = this.props;
    return (
      <div style={{ padding: '2em', height: '100%' }}>
        {trip.calculating && (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2 style={{ marginBottom: '3em' }}>Planning your perfect trip...</h2>
            <Spin size="large" />
          </div>
        )}
        {!trip.calculating && <Trip trip={trip} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
});

const mapDispatchToProps = dispatch => ({
  routeToPage: page => dispatch(routeToPage(page)),
});

Overview.propTypes = {
  routeToPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
