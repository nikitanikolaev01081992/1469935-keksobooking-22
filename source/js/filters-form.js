// module for controlling filters form
import { debounce, getNode } from './util.js';
import { addFilterForData, clearFiltersForData } from './data-filters.js';

// -----------------------------------------------------------------------
// Constants
const FILTERS_FORM = getNode('.map__filters');
const FEATURES_FIELDSET = getNode('#housing-features', FILTERS_FORM);

const HANDLER_TIMEOUT = 500;

// -----------------------------------------------------------------------
// function clears all data filters on reset event
const getFormResetHandler = (onFilterChange) => {
  return () => {
    clearFiltersForData();

    // do smth from main module
    onFilterChange();
  };
};

const getFormChangeHandler = (onFilterChange) => {
  return (evt) => {
    const target = evt.target;

    // we need change filters for data
    if (target.getAttribute('name') !== 'features') {
      addFilterForData(target.name, target.value);
    } else {
      const inputs = Array.from(FEATURES_FIELDSET.querySelectorAll('input:checked'));

      const inputValues = inputs.map((input) => input.value);

      addFilterForData('features', inputValues);
    }

    // do smth from main module
    onFilterChange();
  };
};

// -----------------------------------------------------------------------
// function adds all hanlers to corresonding nodes
const addFiltersFormHandlers = (onFilterChange) => {
  const debouncedOnFormChange = debounce(getFormChangeHandler(onFilterChange), HANDLER_TIMEOUT);

  FILTERS_FORM.addEventListener('reset', getFormResetHandler(onFilterChange));
  FILTERS_FORM.addEventListener('change', debouncedOnFormChange);
};

export { addFiltersFormHandlers };
