import { Button, Timeline } from 'antd';
import * as React from 'react';

import transitSvg from './img/transit.svg';
import walkingSvg from './img/walking.svg';

const renderActivities = (activities: IActivities[], travel: any[]) =>
  activities.map(act => {
    const index = activities.indexOf(act);
    if (index !== activities.length - 1) {
      return (
        <React.Fragment key={index}>
          <Timeline.Item>{act.activity.name}</Timeline.Item>
          <Timeline.Item>
            <img
              style={{ margin: '0 1em' }}
              src={walkingSvg}
              alt="walking icon"
            />
            {travel[index][0]}
            <img
              style={{ margin: '0 1em' }}
              src={transitSvg}
              alt="transit icon"
            />
            {travel[index][1]}
          </Timeline.Item>
        </React.Fragment>
      );
    }
    return (
      <Timeline.Item key={act.activity.name}>{act.activity.name}</Timeline.Item>
    );
  });

const Trip = ({
  trip: { activities, travel },
  calculate,
  reset,
  routeToMap
}: ITripProps) => (
  <div
    style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%'
    }}
  >
    <Timeline style={{ flexGrow: 1 }}>
      {renderActivities(activities, travel)}
    </Timeline>
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
