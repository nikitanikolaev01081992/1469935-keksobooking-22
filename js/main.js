import { disableForms, enableForms } from './state.js';
import { addFormHandlers, updateAddress } from './form.js';
import { initMap } from './map.js';
import { getOfferNode } from './offers.js';
import { getData } from './data.js';

// -----------------------------------------------------------------------
// disabling forms
disableForms();

// -----------------------------------------------------------------------
// getting data for offers
const offersData = getData();

// -----------------------------------------------------------------------
// adding map
const markersData = offersData.map((item, index) => {
  return {
    lat: item.location.x,
    lng: item.location.y,
    id: index,
  };
});

const onMapLoad = () => {
  enableForms();
};

const onMainMarkerMoveEnd = (coords) => {
  updateAddress(coords);
};

const getPopup = (id) => {
  return getOfferNode(offersData[id]);
};

initMap(onMapLoad, onMainMarkerMoveEnd, markersData, getPopup);

// -----------------------------------------------------------------------
// adding form handlers
addFormHandlers();
