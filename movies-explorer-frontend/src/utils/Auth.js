export const BASE_URL = 'https://api.moviechef.nomoredomains.rocks';
export const LOCAL_URL = 'http://localhost:3000';

async function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
}

export const register = (name, email, password) => {
  return fetch(`${LOCAL_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
  .then(checkResponse);
}

export const authorize = (email, password) => {
  return fetch(`${LOCAL_URL}/signin`, {
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
  return fetch(`${LOCAL_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  })
  .then(checkResponse);
}