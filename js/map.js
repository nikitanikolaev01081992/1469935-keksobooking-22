// module for map
/* global L:readonly */
import { getNode } from './util.js';

// -----------------------------------------------------------------------
// Constants
const MAP_CONTAINER = getNode('#map-canvas');
const MAP_OBJ = L.map(MAP_CONTAINER);

const InitialOptions = {
  LAT: 35.6938,
  LNG: 139.7034,
  ZOOM: 12,
};

const LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_PIN_ICON = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MainMarkerParams = {
  LAT: InitialOptions.LAT,
  LNG: InitialOptions.LNG,
  ICON: MAIN_PIN_ICON,
  DRAGGABLE: true,
};

const PIN_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MarkerParams = {
  ICON: PIN_ICON,
  DRAGGABLE: false,
};

// -----------------------------------------------------------------------
// function create map from Leaflet
const createMap = (onLoadFunc) => {
  if (onLoadFunc) {
    MAP_OBJ.on('load', onLoadFunc);
  }

  // prettier-ignore
  const {LAT: lat, LNG: lng, ZOOM: zoom} = InitialOptions;

  MAP_OBJ.setView({ lat, lng }, zoom);

  L.tileLayer(LAYER_URL, {
    attribution: LAYER_ATTRIBUTION,
  }).addTo(MAP_OBJ);
};

// -----------------------------------------------------------------------
// function create marker in MAP_OBJ
const addMarker = ({ lat, lng, icon, draggable = false }) => {
  const pinMarker = L.marker({ lat, lng }, { draggable, icon });

  pinMarker.addTo(MAP_OBJ);

  return pinMarker;
};

// -----------------------------------------------------------------------
// function create main marker in MAP_OBJ
const addMainMarker = (onMarkerMoveEnd) => {
  //adding main marker to map
  const { LAT: lat, LNG: lng, ICON: icon, DRAGGABLE: draggable } = MainMarkerParams;

  const mainMarker = addMarker({ lat, lng, icon, draggable });

  if (onMarkerMoveEnd) {
    mainMarker.on('moveend', (evt) => {
      onMarkerMoveEnd(evt.target.getLatLng());
    });

    onMarkerMoveEnd(mainMarker.getLatLng());
  }

  return mainMarker;
};

// -----------------------------------------------------------------------
// function add markers to MAP_OBJ from array with data for markes
// markersData is array of objects {lat, lng, popupContent}
const addMarkers = (markersData) => {
  if (!Array.isArray(markersData)) {
    throw new Error('addMarkers: неверные входные параметры');
  }

  // prettier-ignore
  markersData.forEach(
    ({ lat, lng, popupContent, icon = MarkerParams.ICON, draggable = MarkerParams.DRAGGABLE }) => {
      const marker = addMarker({ lat, lng, icon, draggable });
      marker.bindPopup(popupContent);
    },
  );
};

// -----------------------------------------------------------------------
// EXPORTS
export { createMap, addMarkers, addMainMarker };
