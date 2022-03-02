export const BASE_URL = 'https://api.moviechef.nomoredomains.rocks';

async function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
  .then(checkResponse);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse);
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  })
  .then(checkResponse);
}