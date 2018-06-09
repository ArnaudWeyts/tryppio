import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { Button, Icon } from 'antd';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYXJuYXVkd2V5dHMiLCJhIjoiY2o0cGt3d3oxMXl0cDMzcXNlbThnM3RtaCJ9.BMUyxqHH-FC69pW4U4YO9A',
});

class ActivityMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };
  }

  render() {
    return (
      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        maxBounds={[[3.663866, 51.019584], [3.779481, 51.094461]]}
        onStyleLoad={map => this.setState({ map })}
      >
        <button />
        <Button
          onClick={this.props.routeToOverview}
          style={{ position: 'absolute', margin: '1.25em' }}
          type="primary"
          shape="circle"
          icon="caret-left"
          size="large"
        />
        {this.props.activities.map(({ activity }) => (
          <Marker
            key={activity.name}
            coordinates={[activity.lng, activity.lat]}
            anchor="bottom"
            onClick={() => this.state.map.flyTo({ center: [activity.lng, activity.lat], zoom: 18 })}
          >
            <Icon type="compass" style={{ fontSize: 30 }} />
          </Marker>
        ))}
      </Map>
    );
  }
}

ActivityMap.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  routeToOverview: PropTypes.func.isRequired,
};

export default ActivityMap;
