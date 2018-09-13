// import config from 'config';
import { authHeader } from '../helpers/authHeader';

const userService = {
  getAll,
  getById,
  login,
  logout,
  register,
  update, // tslint:disable-next-line:object-literal-sort-keys
  delete: _delete
};

export default userService;

function login(username: string, password: string) {
  const requestOptions = {
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  };

  /*return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });*/
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    headers: authHeader(),
    method: 'GET'
  };

  // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id: number) {
  const requestOptions = {
    headers: authHeader(),
    method: 'GET'
  };

  /*return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );*/
}

function register(user: { username: string; password: string }) {
  const requestOptions = {
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  };

  /*return fetch(`${config.apiUrl}/users/register`, requestOptions).then(
    handleResponse
  );*/
}

function update(user: { id: number; username: string; password: string }) {
  const requestOptions = {
    body: JSON.stringify(user),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    method: 'PUT'
  };

  /*return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );*/
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: number) {
  const requestOptions = {
    headers: authHeader(),
    method: 'DELETE'
  };

  /*return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );*/
}

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
