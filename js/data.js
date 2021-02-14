import * as util from './util.js';

//-----------------------------------------------------------------------
// Constants
const PRICE_MAX = 1000000;
const ROOMS_MAX = 100;
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['14:00', '13:00', '12:00']; // this array should be in descending order
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const LatitudeRanges = {
  MIN: 35.65,
  MAX: 35.7,
};

const LongitudeRanges = {
  MIN: 139.7,
  MAX: 139.8,
};

const MinPricesByType = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0,
};

//-----------------------------------------------------------------------
// DATA GENERATOR
const getRandDataObject = (id = 1) => {
  const location = {
    x: util.getRandomFloat(LatitudeRanges.MIN, LatitudeRanges.MAX, 5),
    y: util.getRandomFloat(LongitudeRanges.MIN, LongitudeRanges.MAX, 5),
  };

  const type = util.getRandElemFromArray(TYPE);
  const price = util.getRandomInt(MinPricesByType[type], PRICE_MAX);

  const rooms = util.getRandomInt(1, ROOMS_MAX);
  const guests = util.getRandomInt(1, rooms); //looks like 1 room can have max 1 guest

  const checkin = util.getRandElemFromArray(TIME);
  // const availabeTimes = TIME.slice(TIME.indexOf(checkin)); //we can do this bevause of order in array
  const checkout = checkin;

  return {
    author: {
      avatar: `img/avatars/user0${util.getRandomInt(1, 8)}.png`,
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
      features: util.getRandArrayFromValues(FEATURES),
      description: 'Some description',
      photos: util.getRandArrayFromValues(PHOTOS),
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

export { generateDummyData };
