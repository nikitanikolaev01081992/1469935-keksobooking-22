// module for adding similar offers to DOM
// prettier-ignore
import {
  queryNodes,
  hideElement,
  addNodeTextContent,
  addNodeSrc,
  renderItem,
  pluralize,
  getNode
} from './util.js';

// -----------------------------------------------------------------------
// Constants, Enums

// this variable contains css classes of offer's template children
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

const OFFER_TEMPLATE = getNode('#card');

// -----------------------------------------------------------------------
// function returns Document Fragment with appended <li> items of features
const getFeaturesFragment = (container, features) => {
  if (!container || !Array.isArray(features)) {
    throw new Error('getFeaturesFragment: Неверные входные параметры');
  }

  const fragment = document.createDocumentFragment();

  const featureTemplate = getNode('.popup__feature', container);
  featureTemplate.className = 'popup__feature';

  features.forEach((featureData) => {
    const domItem = featureTemplate.cloneNode(true);
    domItem.classList.add(`popup__feature--${featureData}`);
    fragment.appendChild(domItem);
  });

  return fragment;
};

// -----------------------------------------------------------------------
// function returns Document Fragment with appended <img> items of photos
const getPhotosFragment = (container, photos) => {
  if (!container || !Array.isArray(photos)) {
    throw new Error('getPhotosFragment: Неверные входные параметры');
  }

  const fragment = document.createDocumentFragment();
  const photoTemplate = getNode('.popup__photo', container);

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

// -----------------------------------------------------------------------
// function returns DOM element representing offer
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

  renderItem(nodes.features, offer.features, getFeaturesFragment);
  renderItem(nodes.photos, offer.photos, getPhotosFragment);

  return offerElement;
};

// -----------------------------------------------------------------------
// function returns document fragment with appended nodes of offers
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

// -----------------------------------------------------------------------
// EXPORTS
export { getOfferNode, getOffersFragment };
