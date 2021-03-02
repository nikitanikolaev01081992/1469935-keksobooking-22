import { addData } from './data.js';
import { getOfferNode } from './offers.js';
import { addFormHandlers } from './form.js';
import { getNode } from './util.js';

// -----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = getNode('.map__canvas');

// -----------------------------------------------------------------------
// adding offer to DOM
addData(OFFERS_CONTAINER, getOfferNode);

// -----------------------------------------------------------------------
// adding form handlers
addFormHandlers();
