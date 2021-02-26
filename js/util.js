//-----------------------------------------------------------------------
const getRandomInt = (min, max) => {
  if (isNaN(min) || isNaN(min) || min < 0 || max < 0) {
    throw new Error('getRandomInt: Неверные входные параметры');
  }

  let [localMin, localMax] =
    min > max ? [Math.ceil(max), Math.floor(min)] : [Math.ceil(min), Math.floor(max)];
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
// function hides dom element
const hideElement = (element) => {
  element.classList.add('hidden');
};

//-----------------------------------------------------------------------
//function adds text content to dom element or hide element in case of empty content
const addNodeTextContent = (node, content) => {
  if (content) {
    node.textContent = content;
  } else {
    hideElement(node);
  }
};

//-----------------------------------------------------------------------
//function adds src url to dom element or hide element in case of empty src url
const addNodeSrc = (node, srcUrl) => {
  if (srcUrl) {
    node.setAttribute('src', srcUrl);
  } else {
    hideElement(node);
  }
};

//-----------------------------------------------------------------------
//function return pluralized string
const pluralize = (count, variants) => {
  const countAbs = Math.abs(count) % 100;
  const count2 = count % 10;
  if (countAbs > 10 && countAbs < 20) return variants[2];
  if (count2 > 1 && count2 < 5) return variants[1];
  if (count2 === 1) return variants[0];

  return variants[2];
};

//-----------------------------------------------------------------------
//function return node by selector or throw error in case of non-existing node
const getNode = (selector, parentNode = document) => {
  const node = parentNode.querySelector(selector);

  if (!node) {
    throw new Error(`${selector} не найден!`);
  }

  return node;
};

//-----------------------------------------------------------------------
//function returns object with children of given DOM container
const queryNodes = (parentNode, selectors) => {
  let nodes = {};

  for (const key of Object.keys(selectors)) {
    const childNode = getNode(selectors[key], parentNode);

    nodes[key] = childNode;
  }

  return nodes;
};

//-----------------------------------------------------------------------
//function add generated fragment using getElement function from data array to node
const renderItem = (node, data, getElement) => {
  if (data.length > 0) {
    const fragment = getElement(node, data);

    node.innerHTML = '';
    node.appendChild(fragment);
  } else {
    hideElement(node);
  }
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
  addNodeTextContent,
  addNodeSrc,
  pluralize,
  getNode,
  queryNodes,
  renderItem
};
