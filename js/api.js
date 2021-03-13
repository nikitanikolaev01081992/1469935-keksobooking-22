// -----------------------------------------------------------------------
const DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

// -----------------------------------------------------------------------
// function get data from server and runs onSuccess/onFail callbacks
const getData = (onSuccess, onFail) => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Get request error ${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(onFail);
};

// -----------------------------------------------------------------------
// function sends data to server and runs onSuccess/onFail callbacks
const sendData = (onSuccess, onFail, body) => {
  fetch(POST_URL, { method: 'POST', body })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`Send request error ${response.status} ${response.statusText}`);
      }
    })
    .catch(onFail);
};

// -----------------------------------------------------------------------
// EXPORTS
export { getData, sendData };
