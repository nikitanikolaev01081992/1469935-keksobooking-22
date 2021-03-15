// -----------------------------------------------------------------------
// Constants, Enums
const MAX_ITEM_COUNT = 10;

// -----------------------------------------------------------------------
// global filter function for data
const filterDataGlobal = (data) => {
  return data.slice(0, MAX_ITEM_COUNT);
};

const addFilterForData = (filterName, filterValue) => {
  if (filterName === 'type') {
    currentFilters['filterDataByType'] = (data) => {
      return data.filter((dataItem) => {
        if (filterValue === 'any') {
          return true;
        }
        return dataItem.offer.type === filterValue;
      });
    };
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
