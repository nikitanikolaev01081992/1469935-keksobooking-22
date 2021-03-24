// max number of items on the map, used in filters
const MAX_ITEM_COUNT = 10;

// enum with lower price bounds
const PriceBounds = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const MinPricesByType = {
  PALACE: 10000,
  HOUSE: 5000,
  FLAT: 1000,
  BUNGALOW: 0,
};

// -----------------------------------------------------------------------
// exports
export { MAX_ITEM_COUNT, PriceBounds, MinPricesByType };
