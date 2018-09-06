import { Spin } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';

import { resetQuestions } from '../actions/questions';
import { routeToPage as routeToPageDisp } from '../actions/routing';
import { startCalculation } from '../actions/trip';
import { resetPreferences } from '../actions/user';

import { AnyAction, Dispatch } from 'redux';
import Trip from '../components/Trip';
import { IOverviewProps } from '../types/overview';

class Overview extends React.Component<IOverviewProps> {
  constructor(props: IOverviewProps) {
    super(props);

    this.resetPreferences = this.resetPreferences.bind(this);
  }

  public resetPreferences() {
    this.props.resetPreferences();
    this.props.resetQuestions();
    this.props.routeToPage('intro');
  }

  public render() {
    const { trip, routeToPage } = this.props;
    return (
      <div style={{ padding: '2em', height: '100%' }}>
        {trip.calculating && (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center'
            }}
          >
            <h2 style={{ marginBottom: '3em' }}>
              Planning your perfect trip...
            </h2>
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

const mapStateToProps = (state: IState) => ({
  trip: state.trip
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction> | any) => ({
  calculateTrip: () => dispatch(startCalculation()),
  resetPreferences: () => dispatch(resetPreferences()),
  resetQuestions: () => dispatch(resetQuestions()),
  routeToPage: (page: string) => dispatch(routeToPageDisp(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);
