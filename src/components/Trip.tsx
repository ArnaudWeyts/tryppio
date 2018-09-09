import { Button, Timeline } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import transitSvg from './img/transit.svg';
import walkingSvg from './img/walking.svg';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

const ButtonContainer = styled.div`
  & > * {
    width: 100%;
    margin: 0.5em 0;
  }
`;

const MapButton = styled(Button as any)`
  height: 4em;
`;

const ButtonGroup = styled(Button.Group)`
  width: 100%;
`;

const GroupedButton = styled(Button as any)`
  width: 50%;
  height: 3.5em;
`;

const Icon = styled.img`
  margin: 0 1em;
`;

const renderActivities = (activities: IActivities[], travel: any[]) =>
  activities.map(act => {
    const index = activities.indexOf(act);
    if (index !== activities.length - 1) {
      return (
        <React.Fragment key={index}>
          <Timeline.Item>{act.activity.name}</Timeline.Item>
          <Timeline.Item>
            <Icon src={walkingSvg} alt="walking icon" />
            {travel[index][0]}
            <Icon src={transitSvg} alt="transit icon" />
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
  <Container>
    <Timeline style={{ flexGrow: 1 }}>
      {renderActivities(activities, travel)}
    </Timeline>
    <ButtonContainer>
      <MapButton type="primary" onClick={routeToMap}>
        View map
      </MapButton>
      <ButtonGroup>
        <GroupedButton onClick={calculate}>Calculate a new trip</GroupedButton>
        <GroupedButton onClick={reset}>Reset my preferences</GroupedButton>
      </ButtonGroup>
    </ButtonContainer>
  </Container>
);

export default Trip;
