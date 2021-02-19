//module for adding similar offers to DOM
import { hideElement } from './util.js';
import { generateDummyData } from './data.js';

//-----------------------------------------------------------------------
//Constants, Enums
const TypeTranslations = {
  PALACE: 'Дворец',
  HOUSE: 'Дом',
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
};

const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 45;
const IMAGE_ALT = 'Фотография жилья';

//-----------------------------------------------------------------------
//function returns children of given DOM offer
const getOfferDomChildren = (offer) => {
  return {
    avatar: offer.querySelector('.popup__avatar'),
    title: offer.querySelector('.popup__title'),
    address: offer.querySelector('.popup__text--address'),
    price: offer.querySelector('.popup__text--price'),
    type: offer.querySelector('.popup__type'),
    capacity: offer.querySelector('.popup__text--capacity'),
    time: offer.querySelector('.popup__text--time'),
    features: offer.querySelector('.popup__features'),
    description: offer.querySelector('.popup__description'),
    photos: offer.querySelector('.popup__photos'),
  };
};

//-----------------------------------------------------------------------
//function returns Document Fragment with appended <li> items of features
const getFeaturesFragment = (features) => {
  if (!Array.isArray(features)) {
    throw new Error('getFeaturesFragment: Неверные входные параметры');
  }

  let fragment = document.createDocumentFragment();

  features.forEach((item) => {
    const domItem = document.createElement('li');
    domItem.classList.add('popup__feature', `popup__feature--${item}`);
    fragment.appendChild(domItem);
  });

  return fragment;
};

//-----------------------------------------------------------------------
//function returns Document Fragment with appended <img> items of photos
const getPhotosFragment = (photos) => {
  if (!Array.isArray(photos)) {
    throw new Error('getFeaturesFragment: Неверные входные параметры');
  }

  let fragment = document.createDocumentFragment();

  photos.forEach((item) => {
    const domItem = document.createElement('img');
    domItem.classList.add('popup__photo');
    domItem.src = item;
    domItem.width = IMAGE_WIDTH;
    domItem.height = IMAGE_HEIGHT;
    domItem.alt = IMAGE_ALT;
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
//function returns DOM element representing offer
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const getDomOffer = (offerData) => {
  if (!offerData || !offerData.author || !offerData.offer) {
    throw new Error('getDomOffer: Неверные входные параметры');
  }

  const offer = offerData.offer;
  const newDomOffer = offerTemplate.cloneNode(true);
  const newDomOfferChildren = getOfferDomChildren(newDomOffer);

  if (offerData.author.avatar) {
    newDomOfferChildren.avatar.src = offerData.author.avatar;
  } else {
    hideElement(newDomOfferChildren.avatar);
  }

  addOfferTextContent(newDomOfferChildren.title, offer.title);
  addOfferTextContent(newDomOfferChildren.address, offer.address);

  if (offer.price) {
    newDomOfferChildren.price.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  } else {
    hideElement(newDomOfferChildren.price);
  }

  addOfferTextContent(newDomOfferChildren.type, TypeTranslations[offer.type.toUpperCase()]);

  if (offer.rooms && offer.guests) {
    newDomOfferChildren.capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    hideElement(newDomOfferChildren.capacity);
  }

  if (offer.checkin && offer.checkout) {
    newDomOfferChildren.time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    hideElement(newDomOfferChildren.time);
  }

  if (offer.features.length > 0) {
    newDomOfferChildren.features.innerHTML = '';
    newDomOfferChildren.features.appendChild(getFeaturesFragment(offer.features));
  } else {
    hideElement(newDomOfferChildren.features);
  }

  addOfferTextContent(newDomOfferChildren.description, offer.description);

  if (offer.photos.length > 0) {
    newDomOfferChildren.photos.innerHTML = '';
    newDomOfferChildren.photos.appendChild(getPhotosFragment(offer.photos));
  } else {
    hideElement(newDomOfferChildren.photos);
  }

  return newDomOffer;
};

//-----------------------------------------------------------------------
//adding offer to DOM
const offersContainer = document.querySelector('.map__canvas');
const dummyData = generateDummyData(1);
const newDomOffer = getDomOffer(dummyData[0]);

offersContainer.appendChild(newDomOffer);
