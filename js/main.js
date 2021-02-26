import { MinPricesByType, generateDummyData } from './data.js';
import { getOfferNode } from './offers.js';
import { getPlaceTypeHandler, getTimeHandler } from './form.js';
import { getNode } from './util.js';

//-----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = getNode('.map__canvas');

const DUMMY_DATA = generateDummyData(1);

const OFFER_FORM = getNode('.notice');
const PLACE_TYPE_INPUT = getNode('#type', OFFER_FORM);
const PLACE_PRICE_INPUT = getNode('#price', OFFER_FORM);
const TIME_IN_INPUT = getNode('#timein', OFFER_FORM);
const TIME_OUT_INPUT = getNode('#timeout', OFFER_FORM);

// -----------------------------------------------------------------------
// adding offer to DOM
OFFERS_CONTAINER.appendChild(getOfferNode(DUMMY_DATA[0]));

// -----------------------------------------------------------------------
// adding handler to type input
const onPlaceTypeChange = getPlaceTypeHandler(PLACE_TYPE_INPUT, PLACE_PRICE_INPUT, MinPricesByType);
onPlaceTypeChange();

PLACE_TYPE_INPUT.addEventListener('change', onPlaceTypeChange);

// -----------------------------------------------------------------------
// adding handler to time inputs
const onCheckinChange = getTimeHandler(TIME_IN_INPUT, TIME_OUT_INPUT);
const onCheckoutChange = getTimeHandler(TIME_OUT_INPUT, TIME_IN_INPUT);

onCheckinChange();

TIME_IN_INPUT.addEventListener('change', onCheckinChange);
TIME_OUT_INPUT.addEventListener('change', onCheckoutChange);
