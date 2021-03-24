import { hideElement, addNodeContent, addNodeSrc, getNode, queryNodes, renderItem } from './nodes.js';
import { showLoadAlert } from './alert.js';

//-----------------------------------------------------------------------
//function returns pluralized string
const pluralize = (count, variants) => {
  const countAbs = Math.abs(count) % 100;
  const count2 = count % 10;

  if (countAbs > 10 && countAbs < 20) {
    return variants[2];
  }
  if (count2 > 1 && count2 < 5) {
    return variants[1];
  }
  if (count2 === 1) {
    return variants[0];
  }

  return variants[2];
};

//-----------------------------------------------------------------------
//function returns adapted data for markers [{lat, lng, id}]
const adaptMarkersData = (data) => {
  return data.map((item, index) => {
    return {
      lat: item.location.lat,
      lng: item.location.lng,
      id: index,
    };
  });
};

const debounce = (func, ms) => {
  let timeoutId = null;

  return (...args) => {
    const callLater = () => {
      timeoutId = null;
      func(...args);
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(callLater, ms);
  };
};

// -----------------------------------------------------------------------
// EXPORTS
// prettier-ignore
export {
  hideElement,
  addNodeContent,
  addNodeSrc,
  pluralize,
  getNode,
  queryNodes,
  renderItem,
  showLoadAlert,
  adaptMarkersData,
  debounce
};
