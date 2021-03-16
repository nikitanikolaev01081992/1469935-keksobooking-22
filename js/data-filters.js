// -----------------------------------------------------------------------
// Constants, Enums
const MAX_ITEM_COUNT = 10;

// -----------------------------------------------------------------------
// global filter function for data
const filterDataGlobal = (data) => {
  return data.slice(0, MAX_ITEM_COUNT);
};

// -----------------------------------------------------------------------
// function returns function to filter data by type
const getDataFilterByType = (value) => {
  return (data) => {
    return data.filter((dataItem) => {
      if (value === 'any') {
        return true;
      }
      return dataItem.offer.type === value;
    });
  };
};

// -----------------------------------------------------------------------
// function returns function to filter data by price
const getDataFilterByPrice = (value) => {
  return (data) => {
    return data.filter((dataItem) => {
      const offerPrice = parseInt(dataItem.offer.price);

      if (isNaN(offerPrice)) {
        throw new Error('filterDataByPrice: offerPrice не число!');
      }

      switch (value) {
        case 'any':
          return true;
        case 'middle':
          return offerPrice >= 10000 && offerPrice <= 50000;
        case 'low':
          return offerPrice <= 10000;
        case 'high':
          return offerPrice >= 50000;
      }
    });
  };
};

// -----------------------------------------------------------------------
// function returns function to filter data by rooms
const getDataFilterByRooms = (value) => {
  return (data) => {
    return data.filter((dataItem) => {
      if (value === 'any') {
        return true;
      }

      const offerRooms = parseInt(dataItem.offer.rooms);

      if (isNaN(offerRooms)) {
        throw new Error('filterDataByRooms: offerRooms не число!');
      }

      const inputRooms = parseInt(value);

      if (isNaN(inputRooms)) {
        throw new Error('filterDataByRooms: inputRooms не число!');
      }

      return offerRooms === inputRooms;
    });
  };
};

// -----------------------------------------------------------------------
// function returns function to filter data by guests
const getDataFilterByGuests = (value) => {
  return (data) => {
    return data.filter((dataItem) => {
      if (value === 'any') {
        return true;
      }

      const offerGuests = parseInt(dataItem.offer.guests);

      if (isNaN(offerGuests)) {
        throw new Error('filterDataByGuests: offerGuests не число!');
      }

      const inputGuests = parseInt(value);

      if (isNaN(inputGuests)) {
        throw new Error('filterDataByGuests: inputGuests не число!');
      }

      return offerGuests === inputGuests;
    });
  };
};

// -----------------------------------------------------------------------
// function returns function to filter data by features
const getDataFilterByFeatures = (features) => {
  return (data) => {
    return data.filter((dataItem) => {
      if (features.length === 0) {
        return true;
      }

      const offerFeatures = dataItem.offer.features;
      for (const feature of features) {
        if (!offerFeatures.includes(feature)) {
          //offer doesn't contains this feature
          return false;
        }
      }

      return true;
    });
  };
};

// -----------------------------------------------------------------------
// function adds filters for data
const addFilterForData = (filterName, filterValue) => {
  switch (filterName) {
    case 'TYPE':
      currentFilters['filterDataByType'] = getDataFilterByType(filterValue);
      break;
    case 'PRICE':
      currentFilters['filterDataByPrice'] = getDataFilterByPrice(filterValue);
      break;
    case 'ROOMS':
      currentFilters['filterDataByRooms'] = getDataFilterByRooms(filterValue);
      break;
    case 'GUESTS':
      currentFilters['filterDataByGuests'] = getDataFilterByGuests(filterValue);
      break;
    case 'FEATURES':
      currentFilters['filterDataByFeatures'] = getDataFilterByFeatures(filterValue);
      break;
    default:
      throw new Error('addFilterForData: неподдерживаемый тип фильтра!');
  }
};

// -----------------------------------------------------------------------
// current data filters
let currentFilters = {
  filterDataGlobal,
};

// -----------------------------------------------------------------------
// function returns filtered data with all applied filters
const getFilteredData = (data) => {
  let filteredData = data.slice();

  for (const filter of Object.keys(currentFilters)) {
    filteredData = currentFilters[filter](filteredData);
  }

  return filteredData;
};

// -----------------------------------------------------------------------
// function clears filters for data (except default)
const clearFiltersForData = () => {
  currentFilters = {
    filterDataGlobal,
  };
};

export { getFilteredData, addFilterForData, clearFiltersForData };
