//module for adding similar offers to DOM
import { hideElement, addNodeTextContent, addNodeSrc, pluralize } from './util.js';

//-----------------------------------------------------------------------
//Constants, Enums

//this variable contains css classes of offer's template children
const OFFER_NODE_SELECTORS = {
  avatar: '.popup__avatar',
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  capacity: '.popup__text--capacity',
  time: '.popup__text--time',
  features: '.popup__features',
  description: '.popup__description',
  photos: '.popup__photos',
};

const TYPE_TRANSLATIONS = {
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира',
  bungalow: 'Бунгало',
};

const ROOMS_WORDS_VARIANTS = ['комната', 'комнаты', 'комнат'];
const GUESTS_WORDS_VARIANTS = ['гостя', 'гостей', 'гостей'];

const OFFER_TEMPLATE = document.querySelector('#card');

if (!OFFER_TEMPLATE) {
  throw new Error('OFFER_TEMPLATE не найден!');
}

//-----------------------------------------------------------------------
//function returns object with children of given DOM container
const queryNodes = (parentNode, selectors) => {
  let nodes = {};

  for (const key of Object.keys(selectors)) {
    const childNode = parentNode.querySelector(selectors[key]);

    if (!childNode) {
      throw new Error(`queryNodes: '${selectors[key]}' не найден!`);
    }

    nodes[key] = childNode;
  }

  return nodes;
};

//-----------------------------------------------------------------------
//function returns Document Fragment with appended <li> items of features
const getFeaturesFragment = (container, features) => {
  if (!container || !Array.isArray(features)) {
    throw new Error('getFeaturesFragment: Неверные входные параметры');
  }

  const fragment = document.createDocumentFragment();
  const featureTemplate = container.querySelector('.popup__feature');

  if (!featureTemplate) {
    throw new Error('featureTemplate не найден!');
  }

  features.forEach((featureData) => {
    const domItem = featureTemplate.cloneNode(true);
    domItem.classList.add(`popup__feature--${featureData}`);
    fragment.appendChild(domItem);
  });

  return fragment;
};

//-----------------------------------------------------------------------
//function returns Document Fragment with appended <img> items of photos
const getPhotosFragment = (container, photos) => {
  if (!container || !Array.isArray(photos)) {
    throw new Error('getPhotosFragment: Неверные входные параметры');
  }

  const fragment = document.createDocumentFragment();
  const photoTemplate = container.querySelector('.popup__photo');

  if (!photoTemplate) {
    throw new Error('photoTemplate не найден!');
  }

  photos.forEach((photoData) => {
    const domItem = photoTemplate.cloneNode(true);
    domItem.setAttribute('src', photoData);
    fragment.appendChild(domItem);
  });

  return fragment;
};

// -----------------------------------------------------------------------
// function returns text for capacity
const getCapacityText = (rooms, guests) => {
  if (!rooms || !guests) {
    return '';
  }

  const roomWord = pluralize(rooms, ROOMS_WORDS_VARIANTS);
  const guestWord = pluralize(guests, GUESTS_WORDS_VARIANTS);

  return `${rooms} ${roomWord} для ${guests} ${guestWord}`;
};

// -----------------------------------------------------------------------
// function returns text for time
const getCheckinCheckoutText = (checkin, checkout) => {
  return checkin && checkout ? `Заезд после ${checkin}, выезд до ${checkout}` : '';
};

//-----------------------------------------------------------------------
//function returns DOM element representing offer
const getOfferNode = (offerData) => {
  if (!offerData || !offerData.author || !offerData.offer) {
    throw new Error('getOfferNode: Неверные входные параметры');
  }

  const offer = offerData.offer;
  const offerElement = OFFER_TEMPLATE.content.cloneNode(true);
  const nodes = queryNodes(offerElement, OFFER_NODE_SELECTORS);

  addNodeTextContent(nodes.title, offer.title);
  addNodeTextContent(nodes.address, offer.address);
  addNodeTextContent(nodes.type, TYPE_TRANSLATIONS[offer.type]);
  addNodeTextContent(nodes.description, offer.description);
  addNodeTextContent(nodes.capacity, getCapacityText(offer.rooms, offer.guests));
  addNodeTextContent(nodes.time, getCheckinCheckoutText(offer.checkin, offer.checkout));

  addNodeSrc(nodes.avatar, offerData.author.avatar);

  if (offer.price) {
    nodes.price.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  } else {
    hideElement(nodes.price);
  }

  if (offer.features.length > 0) {
    const featuresFragment = getFeaturesFragment(nodes.features, offer.features);

    nodes.features.innerHTML = '';
    nodes.features.appendChild(featuresFragment);
  } else {
    hideElement(nodes.features);
  }

  if (offer.photos.length > 0) {
    const protosFragment = getPhotosFragment(nodes.photos, offer.photos);

    nodes.photos.innerHTML = '';
    nodes.photos.appendChild(protosFragment);
  } else {
    hideElement(nodes.photos);
  }

  return offerElement;
};

//-----------------------------------------------------------------------
//function returns document fragment with appended nodes of offers
const getOffersFragment = (offers) => {
  if (!Array.isArray(offers)) {
    throw new Error('getOffersFragment: Неверные входные параметры');
  }

  const fragment = document.createDocumentFragment();

  offers.forEach((offerData) => {
    fragment.appendChild(getOfferNode(offerData));
  });

  return fragment;
};

//-----------------------------------------------------------------------
//export
export { getOfferNode, getOffersFragment };
