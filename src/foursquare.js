import 'whatwg-fetch';

import prefs from './preferences.json';

const prefCats = prefs.categories;

export default class FoursquareAPI {
  constructor(clientId, clientSecret) {
    this.baseUrl = 'https://api.foursquare.com/v2';
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  GetVenuesForPreference(preference) {
    const categories = prefCats[preference].join(',');

    const url = `${this.baseUrl}/venues/search?client_id=${this.clientId}&client_secret=${
      this.clientSecret
    }&near=Ghent,%20Belgium&v=20180506&categoryId=${categories}&limit=5`;
    return fetch(url)
      .then(resp => resp.json())
      .then(json => json.response.venues);
  }
}
