import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { routeToPage } from '../actions/routing';

class Overview extends Component {
  render() {
    const { calculating } = this.props.trip;
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {calculating && (
          <div>
            <h2 style={{ marginBottom: '3em' }}>Planning your perfect trip...</h2>
            <Spin size="large" />
          </div>
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
});

Overview.propTypes = {
  routeToPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
