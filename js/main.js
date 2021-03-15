import { disableForms, enableAdForm, enableFilterForm } from './state.js';
import { addFormHandlers, updateAddress } from './form.js';
import { initMap, addMarkers } from './map.js';
import { loadData } from './api.js';
import { showAlert } from './util.js';
import { storeData } from './store.js';
import { addFiltersFormHandlers } from './filters-form.js';

// -----------------------------------------------------------------------
// disabling all forms
disableForms();

// -----------------------------------------------------------------------
// adding map
const onSuccessOffersLoad = (offersData) => {
  // save data in store
  storeData(offersData);

  // add markers to map
  addMarkers();

  // markers are ready we can enable filters form
  addFiltersFormHandlers();
  enableFilterForm();
};

const onMapLoad = () => {
  // map is loaded we can enable add form
  addFormHandlers();
  enableAdForm();

  // get data for markers after map is loaded
  loadData(onSuccessOffersLoad, showAlert);
};

const onMainMarkerMoveEnd = (coords) => {
  updateAddress(coords);
};

initMap(onMapLoad, onMainMarkerMoveEnd);
