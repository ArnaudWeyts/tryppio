import loadGoogleMapsApi from 'load-google-maps-api';
import 'whatwg-fetch';

export default class GoogleAPI {
  constructor() {
    this.initializeGMAPSAPI();
  }

  async initializeGMAPSAPI() {
    await loadGoogleMapsApi({ key: process.env.REACT_APP_GOOGLE_KEY }).then((googleMaps) => {
      this.googleMaps = googleMaps;
    });
  }

  CalculateDistance(origin, destination) {
    const originGM = new this.googleMaps.LatLng(origin.lat, origin.lng);
    const destinationGM = new this.googleMaps.LatLng(destination.lat, destination.lng);

    const service = new this.googleMaps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [originGM],
          destinations: [destinationGM],
          travelMode: 'WALKING',
        },
        resp => resolve(resp.rows[0].elements[0].distance.text),
      );
    });
  }
}
