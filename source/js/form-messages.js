import { getNode } from './util.js';

// -----------------------------------------------------------------------
// Constants
const MESSAGE_CONTAINER = getNode('main');

const SUCCESS_MESSAGE_TEMPLATE = getNode('#success');
const SUCCESS_MESSAGE = getNode('.success', SUCCESS_MESSAGE_TEMPLATE.content);

const ERROR_MESSAGE_TEMPLATE = getNode('#error');
const ERROR_MESSAGE = getNode('.error', ERROR_MESSAGE_TEMPLATE.content);

// -----------------------------------------------------------------------
// close message
const closeMessageNode = (messageNode, eventName, handlerFunc) => {
  document.removeEventListener(eventName, handlerFunc);
  document.documentElement.style.overflow = 'auto';
  messageNode.remove();
};

// -----------------------------------------------------------------------
// open message
const openMessageNode = (messageNode, onEscKeyDown, onClick) => {
  document.documentElement.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscKeyDown);

  MESSAGE_CONTAINER.append(messageNode);
  messageNode.addEventListener('click', onClick);
};

// -----------------------------------------------------------------------
// messages handlers
const onEscKeyDownSuccess = (evt) => {
  if (evt.code !== 'Escape') {
    return;
  }

  closeMessageNode(SUCCESS_MESSAGE, 'keydown', onEscKeyDownSuccess);
};

const onEscKeyDownError = (evt) => {
  if (evt.code !== 'Escape') {
    return;
  }

  closeMessageNode(ERROR_MESSAGE, 'keydown', onEscKeyDownError);
};

const onSuccessClick = () => {
  closeMessageNode(SUCCESS_MESSAGE, 'click', onSuccessClick);
};

const onErrorClick = () => {
  closeMessageNode(ERROR_MESSAGE, 'click', onErrorClick);
};

// -----------------------------------------------------------------------
// function adds success message to main
const showSuccessMessage = () => {
  openMessageNode(SUCCESS_MESSAGE, onEscKeyDownSuccess, onSuccessClick);
};

// -----------------------------------------------------------------------
// function adds error message to main
const showErrorMessage = () => {
  openMessageNode(ERROR_MESSAGE, onEscKeyDownError, onErrorClick);
};

// -----------------------------------------------------------------------
// EXPORTS
export { showSuccessMessage, showErrorMessage };
