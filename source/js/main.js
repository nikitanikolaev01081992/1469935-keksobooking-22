import { disableForms, enableAdForm, enableFilterForm } from './state.js';
import { addFormHandlers, updateAddress } from './form.js';
import { initMap, addMarkers, updateMarkers } from './map.js';
import { loadData } from './api.js';
import { adaptMarkersData, showAlert } from './util.js';
import { getData, prepareData, storeData } from './store.js';
import { addFiltersFormHandlers } from './filters-form.js';
import { getOfferNode } from './offers.js';

// -----------------------------------------------------------------------
// disabling all forms
disableForms();

// -----------------------------------------------------------------------
// adding map

// functions for rendering popups
const renderPopup = (id) => {
  return getOfferNode(getData()[id]);
};

// functions for updating popups on filter change
const onFilterChange = () => {
  prepareData();

  const markersData = adaptMarkersData(getData());
  updateMarkers(markersData, renderPopup);
};

const onSuccessOffersLoad = (offersData) => {
  // save data in store
  storeData(offersData);

  // add markers to map
  const markersData = adaptMarkersData(offersData);
  addMarkers(markersData, renderPopup);

  // markers are ready we can enable filters form
  addFiltersFormHandlers(onFilterChange);
  enableFilterForm();
};

const onMapLoad = () => {
  // map is loaded we can enable ad form
  addFormHandlers();
  enableAdForm();

  // get data for markers after map is loaded
  loadData(onSuccessOffersLoad, showAlert);
};

const onMainMarkerMoveEnd = (coords) => {
  updateAddress(coords);
};

initMap(onMapLoad, onMainMarkerMoveEnd);
