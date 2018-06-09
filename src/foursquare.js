import 'whatwg-fetch';

export default class FoursquareAPI {
  constructor(clientId, clientSecret) {
    this.baseUrl = 'https://api.foursquare.com/v2';
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  GetVenuesForCategoryIds(ids) {
    const url = `${this.baseUrl}/venues/search?client_id=${this.clientId}&client_secret=${
      this.clientSecret
    }&near=Ghent,%20Belgium&v=20180506&categoryId=${ids}&limit=5`;
    return fetch(url)
      .then(resp => resp.json())
      .then(json => json.response.venues);
  }
}
