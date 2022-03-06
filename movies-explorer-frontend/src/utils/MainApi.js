class Api {
  constructor(options) {
    this._options = options;
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    return Promise.reject(err);
  }

  getCurrentUserData() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers,
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

  patchCurrentUserData(newUserData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify(newUserData),
    })
    .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._options.baseUrl}/movies`, {
      method: 'GET',
      headers: this._options.headers,
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

  postNewSavedMovie(newSavedMovie) {
    return fetch(`${this._options.baseUrl}/movies`, {
      method: 'POST',
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify(newSavedMovie),
    })
    .then(this._checkResponse);
  }

  deleteSavedMovie(movieId) {
    return fetch(`${this._options.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._options.headers,
      credentials: 'include',
    });
  }
}

export const api = new Api({
  baseUrl: 'https://api.moviechef.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

// https://api.moviechef.nomoredomains.rocks