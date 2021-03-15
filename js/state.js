// module for controlling state of page
import { queryNodes } from './util.js';

// -----------------------------------------------------------------------
// Constants
const FormStates = {
  ENABLED: 1,
  DISABLED: 0,
};

const FormsSelectors = {
  AD_FORM: '.ad-form',
  MAP_FILTERS: '.map__filters',
};

const FormsCssClassesDisabled = {
  AD_FORM: 'ad-form--disabled',
  MAP_FILTERS: 'map__filters--disabled',
};

const Forms = queryNodes(FormsSelectors);

// -----------------------------------------------------------------------
// function change state of inputs
// there are two states: 'disabled' and 'enabled'
const changeInputsState = (inputs, newState) => {
  if (!Array.isArray(inputs)) {
    throw new Error('changeInputsState: неверные входные параметры');
  }

  switch (newState) {
    case FormStates.DISABLED:
      inputs.forEach((input) => {
        input.setAttribute('disabled', true);
      });
      break;

    case FormStates.ENABLED:
      inputs.forEach((input) => {
        input.removeAttribute('disabled');
      });
      break;
  }
};

// -----------------------------------------------------------------------
// function change state of form and her inputs
// there are two states: 'disabled' and 'enabled'
const changeFormState = (formNode, disableCssClass, newState) => {
  if (
    !formNode ||
    !formNode.elements ||
    typeof disableCssClass !== 'string' ||
    newState === null ||
    newState === undefined ||
    !Object.values(FormStates).includes(newState)
  ) {
    throw new Error('changeFormState: неверные входные параметры');
  }

  const inputs = Array.from(formNode.elements);

  changeInputsState(inputs, newState);

  switch (newState) {
    case FormStates.DISABLED:
      formNode.classList.add(disableCssClass);
      break;

    case FormStates.ENABLED:
      formNode.classList.remove(disableCssClass);
      break;
  }
};

// -----------------------------------------------------------------------
// function disable forms
const disableForms = () => {
  for (const key of Object.keys(Forms)) {
    changeFormState(Forms[key], FormsCssClassesDisabled[key], FormStates.DISABLED);
  }
};

// -----------------------------------------------------------------------
// function enable ad forms
const enableAdForm = () => {
  changeFormState(Forms.AD_FORM, FormsCssClassesDisabled.AD_FORM, FormStates.ENABLED);
};

// -----------------------------------------------------------------------
// function enable filter forms
const enableFilterForm = () => {
  changeFormState(Forms.MAP_FILTERS, FormsCssClassesDisabled.MAP_FILTERS, FormStates.ENABLED);
};

// -----------------------------------------------------------------------
// function resets all forms
const resetForms = () => {
  for (const key of Object.keys(Forms)) {
    Forms[key].reset();
  }
};

// -----------------------------------------------------------------------
// EXPORTS
export { disableForms, enableAdForm, enableFilterForm, resetForms };
