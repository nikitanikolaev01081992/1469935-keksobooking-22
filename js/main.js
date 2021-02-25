import { generateDummyData } from './data.js';
import { getOfferNode } from './offers.js';

//-----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = document.querySelector('.map__canvas');

if (!OFFERS_CONTAINER) {
  throw new Error('OFFERS_CONTAINER не найден!');
}

const DUMMY_DATA = generateDummyData(1);

//-----------------------------------------------------------------------
// adding offer to DOM
OFFERS_CONTAINER.appendChild(getOfferNode(DUMMY_DATA[0]));
