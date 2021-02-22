import { generateDummyData } from './data.js';
import { getOfferNode } from './offers.js';

//-----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = document.querySelector('.map__canvas');

if (!OFFERS_CONTAINER) {
  throw new Error('OFFERS_CONTAINER was not found!');
}

//-----------------------------------------------------------------------
// adding offer to DOM
const dummyData = generateDummyData(1);
const newDomOffer = getOfferNode(dummyData[0]);

OFFERS_CONTAINER.appendChild(newDomOffer);
