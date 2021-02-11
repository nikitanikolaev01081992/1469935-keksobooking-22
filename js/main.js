const getRandomFloat = (min, max, precision = 2) => {
  if (
    isNaN(min) ||
    isNaN(min) ||
    isNaN(precision) ||
    min < 0 ||
    max < 0 ||
    precision < 0
  ) {
    throw new Error('getRandomFloat: Неверные входные параметры');
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  let randNum = Math.random() * (max - min) + min;
  randNum = randNum > max ? max : randNum;

  return parseFloat(randNum.toFixed(precision));
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return getRandomFloat(min, max, 0);
};

//function returns random value from array
const getRandElemFromArray = (elements) => {
  if (!Array.isArray(elements)) {
    throw new Error('getRandElemFromArr: Неверные входные параметры');
  }
  if (elements.length === 0) return undefined;

  return elements[getRandomInt(0, elements.length - 1)];
};

//function returns array of random length with unique values
const getRandArrayFromValues = (values) => {
  if (!Array.isArray(values)) {
    throw new Error('getRandArrayFromValues: Неверные входные параметры');
  }

  let availableValues = values.slice();
  const lengthOfArray = getRandomInt(0, values.length);
  let dummyValues = new Array(lengthOfArray).fill(null);

  return dummyValues.map(() => {
    const newItem = getRandElemFromArray(availableValues);
    availableValues.splice(availableValues.indexOf(newItem), 1);

    return newItem;
  });
};

//DATA GENERATOR
const LATITUDE_MIN = 35.65;
const LATITUDE_MAX = 35.7;
const LONGITUDE_MIN = 139.7;
const LONGITUDE_MAX = 139.8;
const PRICE_MAX = 1000000;
const ROOMS_MAX = 100;
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['14:00', '13:00', '12:00']; //this array should be in descending order
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const MinPricesByType = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0,
};

const getRandDataObject = (id = 1) => {
  const location = {
    x: getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, 5),
    y: getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, 5),
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

let dummyData = new Array(10).fill(null).map((elem, index) => {
  return getRandDataObject(index + 1);
});
dummyData;
