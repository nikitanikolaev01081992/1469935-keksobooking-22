import { generateDummyData } from './data.js';
import { getOffersFragment } from './offers.js';

//-----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = document.querySelector('.map__canvas');

if (!OFFERS_CONTAINER) {
  throw new Error('OFFERS_CONTAINER was not found!');
}

const DUMMY_DATA = generateDummyData(1);

//-----------------------------------------------------------------------
// adding offer to DOM
OFFERS_CONTAINER.appendChild(getOffersFragment(DUMMY_DATA));
