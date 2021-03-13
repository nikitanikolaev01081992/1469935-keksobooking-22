import { disableForms, enableForms } from './state.js';
import { addFormHandlers, updateAddress } from './form.js';
import { initMap, addMarkers } from './map.js';
import { getOfferNode } from './offers.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

// -----------------------------------------------------------------------
// disabling forms
disableForms();

// -----------------------------------------------------------------------
// adding map
const onMapLoad = () => {
  const onSuccessOffersLoad = (offersData) => {
    const markersData = offersData.map((item, index) => {
      return {
        lat: item.location.lat,
        lng: item.location.lng,
        id: index,
      };
    });

    const getPopup = (id) => {
      return getOfferNode(offersData[id]);
    };

    addMarkers(markersData, getPopup);
  };

  // map is loaded we can enable forms
  enableForms();

  // get data for markers after map is loaded
  getData(onSuccessOffersLoad, showAlert);
};

const onMainMarkerMoveEnd = (coords) => {
  updateAddress(coords);
};

initMap(onMapLoad, onMainMarkerMoveEnd);

// -----------------------------------------------------------------------
// adding form handlers
addFormHandlers();
