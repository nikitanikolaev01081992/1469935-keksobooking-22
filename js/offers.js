//module for adding similar offers to DOM
import { hideElement } from './util.js';

//-----------------------------------------------------------------------
//Constants, Enums

//this variable contains css classes of offer's template children
const OFFER_CHILDREN = {
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

const OFFER_TEMPLATE = document.querySelector('#card');

if (!OFFER_TEMPLATE) {
  throw new Error('OFFER_TEMPLATE не найден!');
}

//-----------------------------------------------------------------------
//function returns object with children of given DOM offer
const getOfferNodeChildren = (offer) => {
  let offerChildren = {};

  for (const key of Object.keys(OFFER_CHILDREN)) {
    const offerChildNode = offer.querySelector(OFFER_CHILDREN[key]);

    if (!offerChildNode) {
      throw new Error(`getOfferNodeChildren: '${OFFER_CHILDREN[key]}' не найден!`);
    }

    offerChildren[key] = offerChildNode;
  }

  return offerChildren;
};

//-----------------------------------------------------------------------
//function returns Document Fragment with appended <li> items of features
const getFeaturesFragment = (container, features) => {
  if (!container || !Array.isArray(features)) {
    throw new Error('getFeaturesFragment: Неверные входные параметры');
  }

  let fragment = document.createDocumentFragment();
  const featureTemplate = container.querySelector('.popup__feature');

  if (!featureTemplate) {
    throw new Error('featureTemplate не найден!');
  }

  features.forEach((item) => {
    const domItem = featureTemplate.cloneNode(true);
    domItem.classList.add(`popup__feature--${item}`);
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

  let fragment = document.createDocumentFragment();
  const photoTemplate = container.querySelector('.popup__photo');

  if (!photoTemplate) {
    throw new Error('photoTemplate не найден!');
  }

  photos.forEach((item) => {
    const domItem = photoTemplate.cloneNode(true);
    domItem.src = item;
    fragment.appendChild(domItem);
  });

  return fragment;
};

//-----------------------------------------------------------------------
//function adds text content to dom element or hide element in case of empty content
const addOfferTextContent = (domElem, content) => {
  if (content) {
    domElem.textContent = content;
  } else {
    hideElement(domElem);
  }
};

//-----------------------------------------------------------------------
//function adds src url to dom element or hide element in case of empty src url
const addOfferSrc = (domElem, src) => {
  if (src) {
    domElem.src = src;
  } else {
    hideElement(domElem);
  }
};

//-----------------------------------------------------------------------
//function returns DOM element representing offer
const getOfferNode = (offerData) => {
  if (!offerData || !offerData.author || !offerData.offer) {
    throw new Error('getOfferNode: Неверные входные параметры');
  }

  const offer = offerData.offer;
  const newDomOffer = OFFER_TEMPLATE.content.cloneNode(true);
  const newDomOfferChildren = getOfferNodeChildren(newDomOffer);

  addOfferTextContent(newDomOfferChildren.title, offer.title);
  addOfferTextContent(newDomOfferChildren.address, offer.address);
  addOfferTextContent(newDomOfferChildren.type, TYPE_TRANSLATIONS[offer.type]);
  addOfferTextContent(newDomOfferChildren.description, offer.description);

  const capacityText =
    offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : '';
  addOfferTextContent(newDomOfferChildren.capacity, capacityText);

  const timeText =
    offer.checkin && offer.checkout
      ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
      : '';
  addOfferTextContent(newDomOfferChildren.time, timeText);

  addOfferSrc(newDomOfferChildren.avatar, offerData.author.avatar);

  if (offer.price) {
    newDomOfferChildren.price.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  } else {
    hideElement(newDomOfferChildren.price);
  }

  if (offer.features.length > 0) {
    const featuresFragment = getFeaturesFragment(newDomOfferChildren.features, offer.features);

    newDomOfferChildren.features.innerHTML = '';
    newDomOfferChildren.features.appendChild(featuresFragment);
  } else {
    hideElement(newDomOfferChildren.features);
  }

  if (offer.photos.length > 0) {
    const protosFragment = getPhotosFragment(newDomOfferChildren.photos, offer.photos);

    newDomOfferChildren.photos.innerHTML = '';
    newDomOfferChildren.photos.appendChild(protosFragment);
  } else {
    hideElement(newDomOfferChildren.photos);
  }

  return newDomOffer;
};

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
export { getOffersFragment };
