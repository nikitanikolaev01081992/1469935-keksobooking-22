// module for controlling offer form

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
// EXPORTS
export { getPlaceTypeHandler, getTimeHandler };
