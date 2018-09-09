import { Button, Icon } from 'antd';
import * as React from 'react';
import reactMapboxGl, { Marker } from 'react-mapbox-gl';
import { Link } from 'react-router-dom';

const Map = reactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || ''
});

class ActivityMap extends React.Component<IMapProps, IMapState> {
  constructor(props: IMapProps) {
    super(props);

    this.state = {
      map: null
    };
  }

  public render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{ height: '100vh', width: '100vw' }}
        maxBounds={[[3.663866, 51.019584], [3.779481, 51.094461]]}
        onStyleLoad={map => this.setState({ map })}
      >
        <React.Fragment>
          <Link to="/overview">
            <Button
              style={{ position: 'absolute', margin: '1.25em' }}
              type="primary"
              shape="circle"
              icon="caret-left"
              size="large"
            />
          </Link>
          {this.props.activities.map(({ activity }) => (
            <Marker
              key={activity.name}
              coordinates={[activity.lng, activity.lat]}
              anchor="bottom"
              onClick={() =>
                this.state.map.flyTo({
                  center: [activity.lng, activity.lat],
                  zoom: 18
                })
              }
            >
              <Icon type="compass" style={{ fontSize: 30 }} />
            </Marker>
          ))}
        </React.Fragment>
      </Map>
    );
  }
}

export default ActivityMap;
