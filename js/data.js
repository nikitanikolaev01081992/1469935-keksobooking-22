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

const AVATAR_BASE_URL = 'img/avatars/user<<NUM>>.png';
const MAX_ID = 8;

const LatitudeRanges = {
  MIN: 35.65,
  MAX: 35.7,
};

const LongitudeRanges = {
  MIN: 139.7,
  MAX: 139.8,
};

const MinPricesByType = {
  PALACE: 10000,
  HOUSE: 5000,
  FLAT: 1000,
  BUNGALOW: 0,
};

// -----------------------------------------------------------------------
// DATA GENERATOR

const getRandAvatarUrl = (baseUrl, maxId) => {
  if (
    (typeof baseUrl !== 'string' && !(baseUrl instanceof String)) ||
    !baseUrl.includes('<<NUM>>') ||
    isNaN(maxId) ||
    maxId < 1
  ) {
    throw new Error('getRandAvatar: неверные входные параметры');
  }

  const randId = util.getRandomInt(1, maxId);
  const idStr = randId < 10 ? `0${randId}` : `${randId}`;

  return baseUrl.replace('<<NUM>>', idStr);
};

const getRandDataObject = (id = 1) => {
  const location = {
    x: util.getRandomFloat(LatitudeRanges.MIN, LatitudeRanges.MAX, 5),
    y: util.getRandomFloat(LongitudeRanges.MIN, LongitudeRanges.MAX, 5),
  };

  const type = util.getRandElemFromArray(TYPE);
  const price = util.getRandomInt(MinPricesByType[type.toUpperCase()], PRICE_MAX);

  const rooms = util.getRandomInt(1, ROOMS_MAX);
  const guests = util.getRandomInt(1, rooms); //looks like 1 room can have max 1 guest

  const checkin = util.getRandElemFromArray(TIME);

  return {
    author: {
      avatar: getRandAvatarUrl(AVATAR_BASE_URL, MAX_ID),
    },
    offer: {
      title: `Title ${id}`,
      address: `${location.x}, ${location.y}`,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout: checkin,
      features: util.getRandArrayFromValues(FEATURES),
      description: 'Some description',
      photos: util.getRandArrayFromValues(PHOTOS),
    },
    location,
  };
};

// -----------------------------------------------------------------------
const getData = (counts = 10) => {
  if (isNaN(counts) || counts < 0) {
    throw new Error('generateDummyData: Неверные входные параметры');
  }

  let dummyData = [];
  for (let i = 1; i <= counts; i++) {
    dummyData.push(getRandDataObject(i));
  }

  return dummyData;
};

// -----------------------------------------------------------------------
// EXPORTS
export { MinPricesByType, getData };
