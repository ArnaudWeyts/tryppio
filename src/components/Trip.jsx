import React from 'react';
import { Timeline, Button } from 'antd';

const renderActivities = activities =>
  activities.map(act => <Timeline.Item key={act.activity.name}>{act.activity.name}</Timeline.Item>);

const Trip = ({ trip: { activities }, calculate, reset }) => (
  <div
    style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
    }}
  >
    <Timeline style={{ flexGrow: '1' }}>{renderActivities(activities)}</Timeline>
    <div className="overview-btn-group">
      <Button disabled>View map</Button>
      <Button onClick={calculate}>Calculate a new trip</Button>
      <Button onClick={reset}>Reset my preferences</Button>
    </div>
  </div>
);

export default Trip;
