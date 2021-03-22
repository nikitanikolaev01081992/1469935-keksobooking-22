// -----------------------------------------------------------------------
// Constants, Enums
const MAX_ITEM_COUNT = 10;

// -----------------------------------------------------------------------
// function returns function to check data item by type
const getCheckerByType = (inputValue) => {
  return (dataItem) => {
    if (inputValue === 'any') {
      return true;
    }
    return dataItem.offer.type === inputValue;
  };
};

// -----------------------------------------------------------------------
// function returns function to check data item by price
const getCheckerByPrice = (inputValue) => {
  return (dataItem) => {
    const offerPrice = parseInt(dataItem.offer.price);

    if (isNaN(offerPrice)) {
      throw new Error('checkByPrice: offerPrice не число!');
    }

    switch (inputValue) {
      case 'any':
        return true;
      case 'middle':
        return offerPrice >= 10000 && offerPrice <= 50000;
      case 'low':
        return offerPrice <= 10000;
      case 'high':
        return offerPrice >= 50000;
    }
  };
};

// -----------------------------------------------------------------------
// function returns function to check data item by rooms
const getCheckerByRooms = (inputValue) => {
  return (dataItem) => {
    if (inputValue === 'any') {
      return true;
    }

    const offerRooms = parseInt(dataItem.offer.rooms);

    if (isNaN(offerRooms)) {
      throw new Error('checkByRooms: offerRooms не число!');
    }

    const inputRooms = parseInt(inputValue);

    if (isNaN(inputRooms)) {
      throw new Error('checkByRooms: inputRooms не число!');
    }

    return offerRooms === inputRooms;
  };
};

// -----------------------------------------------------------------------
// function returns function to check data item by guests
const getCheckerByGuests = (inputValue) => {
  return (dataItem) => {
    if (inputValue === 'any') {
      return true;
    }

    const offerGuests = parseInt(dataItem.offer.guests);

    if (isNaN(offerGuests)) {
      throw new Error('checkByGuests: offerGuests не число!');
    }

    const inputGuests = parseInt(inputValue);

    if (isNaN(inputGuests)) {
      throw new Error('checkByGuests: inputGuests не число!');
    }

    return offerGuests === inputGuests;
  };
};

// -----------------------------------------------------------------------
// function returns function to check data item by features
const getCheckerByFeatures = (features) => {
  return (dataItem) => {
    if (features.length === 0) {
      return true;
    }

    const offerFeatures = dataItem.offer.features;

    return features.every((feature) => {
      return offerFeatures.includes(feature);
    });
  };
};

// -----------------------------------------------------------------------
// function adds filters for data
const addFilterForData = (checkerName, inputValue) => {
  switch (checkerName) {
    case 'housing-type':
      currentCheckers['checkByType'] = getCheckerByType(inputValue);
      break;
    case 'housing-price':
      currentCheckers['checkByPrice'] = getCheckerByPrice(inputValue);
      break;
    case 'housing-rooms':
      currentCheckers['checkByRooms'] = getCheckerByRooms(inputValue);
      break;
    case 'housing-guests':
      currentCheckers['checkByGuests'] = getCheckerByGuests(inputValue);
      break;
    case 'features':
      currentCheckers['checkByFeatures'] = getCheckerByFeatures(inputValue);
      break;
    default:
      throw new Error('addFilterForData: неподдерживаемый тип фильтра!');
  }
};

// -----------------------------------------------------------------------
// current data checkers
let currentCheckers = {};

// -----------------------------------------------------------------------
// function returns filtered data with all applied filters
const getFilteredData = (data) => {
  let filteredData = [];

  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i];
    let isSuitable = true;

    // check current data item by all current filters
    for (const key of Object.keys(currentCheckers)) {
      if (!currentCheckers[key](dataItem)) {
        isSuitable = false;
        break;
      }
    }

    if (isSuitable) {
      filteredData.push(dataItem);
    }

    if (filteredData.length === MAX_ITEM_COUNT) {
      break;
    }
  }

  return filteredData;
};

// -----------------------------------------------------------------------
// function clears filters for data (except default)
const clearFiltersForData = () => {
  currentCheckers = {};
};

export { getFilteredData, addFilterForData, clearFiltersForData };
