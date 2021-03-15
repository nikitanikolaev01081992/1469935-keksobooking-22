// module for controlling filters form
import { getNode } from './util.js';
import { prepareData } from './store.js';
import { addFilterForData, clearFiltersForData } from './data-filters.js';
import { updateMarkers } from './map.js';

// -----------------------------------------------------------------------
// Constants
const FILTERS_FORM = getNode('.map__filters');
const HOUSING_TYPE_INPUT = getNode('#housing-type', FILTERS_FORM);

// -----------------------------------------------------------------------
// function update data in store and markers on map
const releaseChanges = () => {
  //prepare data with new filter
  prepareData();

  //update markers with new filtered data
  updateMarkers();
};

// -----------------------------------------------------------------------
// handler for type input change event
const onTypeInputChange = (evt) => {
  //type was changed we need add new filter
  addFilterForData('type', evt.target.value);

  releaseChanges();
};

// -----------------------------------------------------------------------
// function clears all data filters on reset event
const onResetForm = () => {
  clearFiltersForData();
  releaseChanges();
};

// -----------------------------------------------------------------------
// function adds all hanlers to corresonding nodes
const addFiltersFormHandlers = () => {
  FILTERS_FORM.addEventListener('reset', onResetForm);

  HOUSING_TYPE_INPUT.addEventListener('change', onTypeInputChange);
};

export { addFiltersFormHandlers };
