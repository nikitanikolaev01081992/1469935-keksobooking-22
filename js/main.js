const PRICE_MAX = 1000000;
const ROOMS_MAX = 100;
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['14:00', '13:00', '12:00']; //this array should be in descending order
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const CoordinateRanges = {
  latitudeMin: 35.65,
  latitudeMax: 35.7,
  longitudeMin: 139.7,
  longitudeMax: 139.8,
};

const MinPricesByType = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0,
};

const getRandomFloat = (min, max, precision = 2) => {
  if (isNaN(min) || isNaN(min) || isNaN(precision) || min < 0 || max < 0 || precision < 0) {
    throw new Error('getRandomFloat: Неверные входные параметры');
  }

  let [localMin, localMax] = min > max ? [max, min] : [min, max];

  let randNum = Math.random() * (localMax - localMin) + localMin;

  if (Math.random() > 0.5) {
    randNum += 1 / Math.pow(10, precision);
  }
  randNum = Math.trunc(randNum * Math.pow(10, precision)) / Math.pow(10, precision);

  return randNum;
};

const getRandomInt = (min, max) => {
  let [localMin, localMax] = [Math.ceil(min), Math.floor(max)];

  return getRandomFloat(localMin, localMax, 0);
};

//function returns random value from array
const getRandElemFromArray = (elements) => {
  if (!Array.isArray(elements)) {
    throw new Error('getRandElemFromArr: Неверные входные параметры');
  }
  if (elements.length === 0) {
    return undefined;
  }

  return elements[getRandomInt(0, elements.length - 1)];
};

//function returns array of random length with unique values
const getRandArrayFromValues = (values) => {
  if (!Array.isArray(values)) {
    throw new Error('getRandArrayFromValues: Неверные входные параметры');
  }

  return values.filter(() => {
    return Math.random() > 0.5;
  });
};

//DATA GENERATOR
const getRandDataObject = (id = 1) => {
  const location = {
    x: getRandomFloat(CoordinateRanges.latitudeMin, CoordinateRanges.latitudeMax, 5),
    y: getRandomFloat(CoordinateRanges.longitudeMin, CoordinateRanges.longitudeMax, 5),
  };

  const type = getRandElemFromArray(TYPE);
  const price = getRandomInt(MinPricesByType[type], PRICE_MAX);

  const rooms = getRandomInt(1, ROOMS_MAX);
  const guests = getRandomInt(1, rooms); //looks like 1 room can have max 1 guest

  const checkin = getRandElemFromArray(TIME);
  const availabeTimes = TIME.slice(TIME.indexOf(checkin)); //we can do this bevause of order in array
  const checkout = getRandElemFromArray(availabeTimes);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`,
    },
    offer: {
      title: `Title ${id}`,
      address: `${location.x}, ${location.y}`,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features: getRandArrayFromValues(FEATURES),
      description: 'Some description',
      photos: getRandArrayFromValues(PHOTOS),
    },
    location,
  };
};

const generateDummyData = (counts = 10) => {
  if (isNaN(counts) || counts < 0) {
    throw new Error('generateDummyData: Неверные входные параметры');
  }

  let dummyData = [];
  for (let i = 0; i < counts; i++) {
    dummyData.push(getRandDataObject(i + 1));
  }

  return dummyData;
};

generateDummyData();
