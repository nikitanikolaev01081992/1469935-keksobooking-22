// -----------------------------------------------------------------------
const DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

// -----------------------------------------------------------------------
// function load data from server and runs onSuccess/onFail callbacks
const loadData = (onSuccess, onFail) => {
  return fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(onFail);
};

// -----------------------------------------------------------------------
// function sends data to server and runs onSuccess/onFail callbacks
const sendData = (onSuccess, onFail, body) => {
  return fetch(POST_URL, { method: 'POST', body })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }

      throw new Error(`${response.status}`);
    })
    .catch(onFail);
};

// -----------------------------------------------------------------------
// EXPORTS
export { loadData, sendData };
