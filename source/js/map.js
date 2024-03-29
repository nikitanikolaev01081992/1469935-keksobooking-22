// module for map
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { getNode, adaptMarkersData } from './util.js';
import { getOfferNode } from './offers.js';
import { getData } from './store.js';

// -----------------------------------------------------------------------
// Constants
const MAP_CONTAINER = getNode('#map-canvas');
const MAP_OBJ = L.map(MAP_CONTAINER);

const DEFAULT_COORDS = {
  lat: 35.6938,
  lng: 139.7034,
};

const DEFAULT_MAP_ZOOM = 12;

const LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_PIN_ICON_PARAMS = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const MAIN_PIN_ICON = L.icon(MAIN_PIN_ICON_PARAMS);

const PIN_ICON_PARAMS = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};
const PIN_ICON = L.icon(PIN_ICON_PARAMS);

const MAIN_MARKER = L.marker(DEFAULT_COORDS, { icon: MAIN_PIN_ICON, draggable: true });
const MARKER_GROUP = L.layerGroup([]);

// -----------------------------------------------------------------------
// function create map from Leaflet
const createMap = (onLoadFunc) => {
  if (onLoadFunc) {
    MAP_OBJ.on('load', onLoadFunc);
  }

  // prettier-ignore
  MAP_OBJ.setView(DEFAULT_COORDS, DEFAULT_MAP_ZOOM);

  L.tileLayer(LAYER_URL, {
    attribution: LAYER_ATTRIBUTION,
  }).addTo(MAP_OBJ);
};

// -----------------------------------------------------------------------
// function to initialize map with main marker
const initMap = (onLoadFunc, onMainMarkerMoveEnd) => {
  createMap(() => {
    onLoadFunc();
    onMainMarkerMoveEnd(DEFAULT_COORDS);
  });

  //add main marker
  MAIN_MARKER.addTo(MAP_OBJ);

  MAIN_MARKER.on('move', (evt) => {
    onMainMarkerMoveEnd(evt.target.getLatLng());
  });
};

// -----------------------------------------------------------------------
// function for adding markers with popups to map
const addMarkers = () => {
  //create markers
  const popupsData = getData();
  const markersData = adaptMarkersData(popupsData);

  markersData.forEach(({ lat, lng, id }) => {
    const marker = L.marker({ lat, lng }, { icon: PIN_ICON, draggable: false });

    marker.bindPopup(getOfferNode(popupsData[id]));

    MARKER_GROUP.addLayer(marker);
  });

  //add markers to map
  MARKER_GROUP.addTo(MAP_OBJ);
};

// -----------------------------------------------------------------------
// function resets map
const resetMap = () => {
  MAIN_MARKER.setLatLng(DEFAULT_COORDS);
  MAP_OBJ.setView(DEFAULT_COORDS, DEFAULT_MAP_ZOOM);
};

// -----------------------------------------------------------------------
// function clears markers form map and adds new
const updateMarkers = () => {
  MARKER_GROUP.clearLayers();
  addMarkers();
};

// -----------------------------------------------------------------------
// EXPORTS
export { initMap, addMarkers, resetMap, updateMarkers };
