import { MinPricesByType, generateDummyData } from './data.js';
import { getOfferNode } from './offers.js';
import { getPlaceTypeHandler, getTimeHandler } from './form.js';
import { checkExistingNode } from './util.js';

//-----------------------------------------------------------------------
// Constants
const OFFERS_CONTAINER = document.querySelector('.map__canvas');
checkExistingNode(OFFERS_CONTAINER, 'OFFERS_CONTAINER');

const DUMMY_DATA = generateDummyData(1);

const OFFER_FORM = document.querySelector('.notice');
checkExistingNode(OFFER_FORM, 'OFFER_FORM');

const PLACE_TYPE_INPUT = OFFER_FORM.querySelector('#type');
checkExistingNode(PLACE_TYPE_INPUT, 'PLACE_TYPE_INPUT');

const PLACE_PRICE_INPUT = OFFER_FORM.querySelector('#price');
checkExistingNode(PLACE_PRICE_INPUT, 'PLACE_PRICE_INPUT');

const TIME_IN_INPUT = OFFER_FORM.querySelector('#timein');
checkExistingNode(TIME_IN_INPUT, 'TIME_IN_INPUT');

const TIME_OUT_INPUT = OFFER_FORM.querySelector('#timeout');
checkExistingNode(TIME_OUT_INPUT, 'TIME_OUT_INPUT');

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
