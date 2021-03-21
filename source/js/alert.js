import { getNode } from './nodes.js';

// -----------------------------------------------------------------------
// Constants
const ALERT_TEMPLATE = getNode('#alert');
const ALERT_NODE = getNode('.alert', ALERT_TEMPLATE.content);

const ALERT_TIME = 5000;

//-----------------------------------------------------------------------
// function show alert message
const showAlert = (message) => {
  ALERT_NODE.textContent = message;

  document.body.append(ALERT_NODE);

  setTimeout(() => {
    ALERT_NODE.remove();
  }, ALERT_TIME);
};

// -----------------------------------------------------------------------
// EXPORTS
export { showAlert };
