import { Spin } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import styled from 'styled-components';

import { resetQuestions } from '../actions/questions';
import { startCalculation } from '../actions/trip';
import { resetPreferences } from '../actions/user';

import Trip from '../components/Trip';
import { LayoutCentered } from '../shared/styles';
import { IOverviewProps } from '../types/overview';

const Container = styled.div`
  padding: 2em;
  height: 100%;
`;
class Overview extends React.Component<IOverviewProps> {
  constructor(props: IOverviewProps) {
    super(props);

    this.resetPreferences = this.resetPreferences.bind(this);
  }

  public resetPreferences() {
    this.props.resetPreferences();
    this.props.resetQuestions();
    this.props.history.push('/form/diagnosis');
  }

  public render() {
    const { trip, history } = this.props;

    if (!trip.calculating && trip.activities.length < 1) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        {trip.calculating && (
          <LayoutCentered>
            >
            <h2 style={{ marginBottom: '3em' }}>
              Planning your perfect trip...
            </h2>
            <Spin size="large" />
          </LayoutCentered>
        )}
        {!trip.calculating && (
          <Trip
            trip={trip}
            calculate={() => history.push('/form/dates')}
            reset={this.resetPreferences}
            routeToMap={() => history.push('/map')}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  trip: state.trip
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction> | any) => ({
  calculateTrip: () => dispatch(startCalculation()),
  resetPreferences: () => dispatch(resetPreferences()),
  resetQuestions: () => dispatch(resetQuestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);
