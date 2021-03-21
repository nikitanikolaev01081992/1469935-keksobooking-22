import { hideElement, addNodeContent, addNodeSrc, getNode, queryNodes, renderItem } from './nodes.js';
import { showAlert } from './alert.js';

//-----------------------------------------------------------------------
const getRandomInt = (min, max) => {
  if (isNaN(min) || isNaN(min) || min < 0 || max < 0) {
    throw new Error('getRandomInt: Неверные входные параметры');
  }

  let [localMin, localMax] = min > max ? [Math.ceil(max), Math.floor(min)] : [Math.ceil(min), Math.floor(max)];
  const randValue = Math.random();

  return Math.floor(randValue * (localMax - localMin + 1) + localMin);
};

//-----------------------------------------------------------------------
const getRandomFloat = (min, max, precision = 2) => {
  if (isNaN(precision) || precision < 0) {
    throw new Error('getRandomFloat: Неверные входные параметры');
  }

  const multiplier = Math.pow(10, precision);

  return getRandomInt(min * multiplier, max * multiplier) / multiplier;
};

//-----------------------------------------------------------------------
// function returns random value from array
const getRandElemFromArray = (elements) => {
  if (!Array.isArray(elements) || elements.length === 0) {
    throw new Error('getRandElemFromArr: Неверные входные параметры');
  }

  return elements[getRandomInt(0, elements.length - 1)];
};

//-----------------------------------------------------------------------
// function returns array of random length with unique values
const getRandArrayFromValues = (values) => {
  if (!Array.isArray(values)) {
    throw new Error('getRandArrayFromValues: Неверные входные параметры');
  }

  return values.filter(() => getRandomInt(0, 100) > 50);
};

//-----------------------------------------------------------------------
//function returns pluralized string
const pluralize = (count, variants) => {
  const countAbs = Math.abs(count) % 100;
  const count2 = count % 10;
  if (countAbs > 10 && countAbs < 20) return variants[2];
  if (count2 > 1 && count2 < 5) return variants[1];
  if (count2 === 1) return variants[0];

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
  getRandomInt,
  getRandomFloat,
  getRandElemFromArray,
  getRandArrayFromValues,
  hideElement,
  addNodeContent,
  addNodeSrc,
  pluralize,
  getNode,
  queryNodes,
  renderItem,
  showAlert,
  adaptMarkersData,
  debounce
};
