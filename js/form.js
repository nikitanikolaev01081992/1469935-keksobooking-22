// module for controlling offer form
import { getNode } from './util.js';
import { MinPricesByType } from './data.js';

// -----------------------------------------------------------------------
// Constants
const OFFER_FORM = getNode('.notice');
const PLACE_TYPE_INPUT = getNode('#type', OFFER_FORM);
const PLACE_PRICE_INPUT = getNode('#price', OFFER_FORM);
const TIME_IN_INPUT = getNode('#timein', OFFER_FORM);
const TIME_OUT_INPUT = getNode('#timeout', OFFER_FORM);

// -----------------------------------------------------------------------
// function returns change handler fot type input
const getPlaceTypeHandler = (typeNode, priceNode, minPricesByType) => {
  return () => {
    const type = typeNode.value;
    const minPrice = minPricesByType[type.toUpperCase()];

    if (minPrice === undefined) {
      throw new Error('getPlaceTypeHandler: minPrice was not found');
    }

    priceNode.setAttribute('min', minPrice);
    priceNode.setAttribute('placeholder', minPrice);
  };
};

// -----------------------------------------------------------------------
// function returns change handler for checkin/checkput inputs
const getTimeHandler = (eventNode, changingNode) => {
  return () => {
    changingNode.value = eventNode.value;
  };
};

// -----------------------------------------------------------------------
// function adds handlers to type and time inputs
const addFormHandlers = () => {
  // adding handler to type input
  const onTypeChange = getPlaceTypeHandler(PLACE_TYPE_INPUT, PLACE_PRICE_INPUT, MinPricesByType);
  onTypeChange();

  PLACE_TYPE_INPUT.addEventListener('change', onTypeChange);

  // adding handler to time inputs
  const onCheckinChange = getTimeHandler(TIME_IN_INPUT, TIME_OUT_INPUT);
  const onCheckoutChange = getTimeHandler(TIME_OUT_INPUT, TIME_IN_INPUT);

  onCheckinChange();

  TIME_IN_INPUT.addEventListener('change', onCheckinChange);
  TIME_OUT_INPUT.addEventListener('change', onCheckoutChange);
};

// -----------------------------------------------------------------------
// EXPORTS
export { addFormHandlers };
