import 'whatwg-fetch';

export default class FoursquareAPI {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.baseUrl = 'https://api.foursquare.com/v2';
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Gets venues that match the category ids that are passed
   * defaults to ghent and a radius of 2.5 km
   */
  public getVenuesForCategoryIds(
    ids: string,
    coords = [51.05, 3.7167],
    radius = 2500
  ) {
    const url = `${this.baseUrl}/venues/search?client_id=${
      this.clientId
    }&client_secret=${this.clientSecret}&v=20180506&ll=${coords.join(
      ','
    )}&radius=${radius}&intent=browse&categoryId=${ids}&limit=5`;
    return fetch(url)
      .then(resp => resp.json())
      .then(json => json.response.venues);
  }
}
