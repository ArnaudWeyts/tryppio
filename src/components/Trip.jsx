import React from 'react';
import { Timeline, Button } from 'antd';

const renderActivities = activities =>
  activities.map(act => <Timeline.Item key={act.activity.name}>{act.activity.name}</Timeline.Item>);

const Trip = ({
  trip: { activities }, calculate, reset, routeToMap,
}) => (
  <div
    style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
    }}
  >
    <Timeline style={{ flexGrow: '1' }}>{renderActivities(activities)}</Timeline>
    <div className="overview-btn-group">
      <Button style={{ height: '4em' }} type="primary" onClick={routeToMap}>
        View map
      </Button>
      <Button.Group style={{ width: '100%' }}>
        <Button style={{ width: '50%', height: '3.5em' }} onClick={calculate}>
          Calculate a new trip
        </Button>
        <Button style={{ width: '50%', height: '3.5em' }} onClick={reset}>
          Reset my preferences
        </Button>
      </Button.Group>
    </div>
  </div>
);

export default Trip;
