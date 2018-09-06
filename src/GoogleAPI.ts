import loadGoogleMapsApi from 'load-google-maps-api';

export default class GoogleAPI {
  private googleMaps: any;
  private service: any;

  constructor() {
    this.googleMaps = null;
    this.service = null;

    this.initializeGMAPSAPI();
  }

  public async initializeGMAPSAPI() {
    await loadGoogleMapsApi({ key: process.env.REACT_APP_GOOGLE_KEY }).then(
      (googleMaps: any) => {
        this.googleMaps = googleMaps;
        this.service = new this.googleMaps.DistanceMatrixService();
      }
    );
  }

  /**
   * Calculates the time it takes between 2 points
   * @param {Object{Lat: Number, Lng: Number}} origin
   * @param {Object{Lat: Number, Lng: Number}} destination
   * @param {Arrayof String} modes
   * @returns {Promise} Response from google
   */
  public calculateTime(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    modes = ['DRIVING']
  ) {
    const originGM = new this.googleMaps.LatLng(origin.lat, origin.lng);
    const destinationGM = new this.googleMaps.LatLng(
      destination.lat,
      destination.lng
    );

    const requests: any[] = [];

    // Allows for multiple modes to be defined
    modes.forEach(mode => {
      const request = new Promise(resolve => {
        this.service.getDistanceMatrix(
          {
            destinations: [destinationGM],
            origins: [originGM],
            travelMode: mode
          },
          (resp: any) => resolve(resp.rows[0].elements[0].duration.text)
        );
      });

      requests.push(request);
    });

    return Promise.all(requests);
  }
}
