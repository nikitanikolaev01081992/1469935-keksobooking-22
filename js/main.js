import { generateDummyData } from './data.js';
import { getOfferNode } from './offers.js';

//-----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = document.querySelector('.map__canvas');

//-----------------------------------------------------------------------
// adding offer to DOM
const dummyData = generateDummyData(1);
const newDomOffer = getOfferNode(dummyData[0]);

OFFERS_CONTAINER.appendChild(newDomOffer);
