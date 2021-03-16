// module for controlling filters form
import { debounce, getNode } from './util.js';
import { addFilterForData, clearFiltersForData } from './data-filters.js';

// -----------------------------------------------------------------------
// Constants
const FILTERS_FORM = getNode('.map__filters');

const FilterInputs = {
  TYPE: getNode('#housing-type', FILTERS_FORM),
  PRICE: getNode('#housing-price', FILTERS_FORM),
  ROOMS: getNode('#housing-rooms', FILTERS_FORM),
  GUESTS: getNode('#housing-guests', FILTERS_FORM),
  FEATURES: getNode('#housing-features', FILTERS_FORM),
};

const HANDLER_TIMEOUT = 500;

// -----------------------------------------------------------------------
// function returns handler for input change event
const getFilterChangeHandler = (filterName, onFilterChange) => {
  return (evt) => {
    //type was changed we need to add new filter
    if (filterName === 'FEATURES') {
      const inputs = Array.from(FilterInputs.FEATURES.querySelectorAll('input:checked'));

      const inputValues = inputs.map((input) => {
        return input.value;
      });

      addFilterForData(filterName, inputValues);
    } else {
      addFilterForData(filterName, evt.target.value);
    }

    // do smth from main module
    onFilterChange();
  };
};

// -----------------------------------------------------------------------
// function clears all data filters on reset event
const getResetFormHandler = (onFilterChange) => {
  return () => {
    clearFiltersForData();

    // do smth from main module
    onFilterChange();
  };
};

// -----------------------------------------------------------------------
// function adds all hanlers to corresonding nodes
const addFiltersFormHandlers = (onFilterChange) => {
  FILTERS_FORM.addEventListener('reset', getResetFormHandler(onFilterChange));

  for (const key of Object.keys(FilterInputs)) {
    const debouncedHandler = debounce(getFilterChangeHandler(key, onFilterChange), HANDLER_TIMEOUT);
    FilterInputs[key].addEventListener('change', debouncedHandler);
  }
};

export { addFiltersFormHandlers };
