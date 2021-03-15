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
    const getFilterFunc = (value) => {
      return (data) => {
        return data.filter((dataItem) => {
          if (value === 'any') {
            return true;
          }
          return dataItem.offer.type === value;
        });
      };
    };

    currentFilters['filterDataByType'] = getFilterFunc(filterValue);
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

const clearFiltersForData = () => {
  currentFilters = {
    filterDataGlobal,
  };
};

export { getFilteredData, addFilterForData, clearFiltersForData };
