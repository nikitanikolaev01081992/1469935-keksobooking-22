import { getNode } from './nodes.js';

// -----------------------------------------------------------------------
// Constants
const ALERT_TEMPLATE = getNode('#alert');
const ALERT_NODE = getNode('.alert', ALERT_TEMPLATE.content);

const ALERT_TIME = 20000;

const AlertMessages = {
  GET: 'Не удалось загрузить данные. Ошибка - ',
};

//-----------------------------------------------------------------------
// function show alert message
const showAlert = (errorText, alertText) => {
  ALERT_NODE.textContent = alertText + errorText;

  document.body.append(ALERT_NODE);

  setTimeout(() => {
    ALERT_NODE.remove();
  }, ALERT_TIME);
};

// -----------------------------------------------------------------------
const showLoadAlert = (message) => {
  showAlert(message, AlertMessages.GET);
};

// -----------------------------------------------------------------------
// EXPORTS
export { showLoadAlert };
