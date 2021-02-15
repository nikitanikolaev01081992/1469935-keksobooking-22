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

export { getRandomInt, getRandomFloat, getRandElemFromArray, getRandArrayFromValues };
