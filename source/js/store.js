import { getFilteredData } from './data-filters.js';

// -----------------------------------------------------------------------
// Constants, Enums
let rawData = [];
let preparedData = [];

// -----------------------------------------------------------------------
// function for preparing data and save it in closure
const prepareData = () => {
  if (rawData.length === 0) {
    throw new Error('prepareData: данных нет, нечего фильтровать');
  }

  preparedData = getFilteredData(rawData);
};

// -----------------------------------------------------------------------
// function for saving data in closure
const storeData = (data) => {
  rawData = data;

  prepareData();
};

// -----------------------------------------------------------------------
// function for geting data from closure
const getData = () => {
  return preparedData;
};

export { prepareData, storeData, getData };
