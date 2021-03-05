import { disableForms, enableForms } from './state.js';
import { addFormHandlers, updateAddress } from './form.js';
import { createMap, addMarkers, addMainMarker } from './map.js';
import { getOffers } from './offers.js';
import { getData } from './data.js';

// -----------------------------------------------------------------------
// disabling forms
disableForms();

// -----------------------------------------------------------------------
// getting data for offers
const offersData = getData();

// -----------------------------------------------------------------------
// generate offers elements
const offers = getOffers(offersData);

// -----------------------------------------------------------------------
// adding map
const onMainMarkerMoveEnd = (coords) => {
  updateAddress(coords);
};

const onLoadMap = () => {
  enableForms();

  const markersData = offersData.map((item, index) => {
    return {
      lat: item.location.x,
      lng: item.location.y,
      popupContent: offers[index],
    };
  });

  addMainMarker(onMainMarkerMoveEnd);
  addMarkers(markersData);
};

createMap(onLoadMap);

// -----------------------------------------------------------------------
// adding form handlers
addFormHandlers();
