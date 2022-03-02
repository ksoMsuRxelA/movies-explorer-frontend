export const BASE_URL = 'https://api.nomoreparties.co';

async function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(checkResponse);
};