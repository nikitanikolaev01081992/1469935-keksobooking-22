// module for controlling offer form
import { getNode } from './util.js';
import { MinPricesByType } from './data.js';
import { resetForms } from './state.js';
import { resetMap } from './map.js';
import { showSuccessMessage, showErrorMessage } from './form-messages.js';
import { sendData } from './api.js';

// -----------------------------------------------------------------------
// Constants
const OFFER_FORM = getNode('.notice');
const OFFER_RESET_BUTTON = getNode('.ad-form__reset', OFFER_FORM);
const TITLE_INPUT = getNode('#title', OFFER_FORM);
const TYPE_INPUT = getNode('#type', OFFER_FORM);
const PRICE_INPUT = getNode('#price', OFFER_FORM);
const TIME_IN_INPUT = getNode('#timein', OFFER_FORM);
const TIME_OUT_INPUT = getNode('#timeout', OFFER_FORM);
const ROOM_NUMBER_INPUT = getNode('#room_number', OFFER_FORM);
const CAPACITY_INPUT = getNode('#capacity', OFFER_FORM);
const ADDRESS_INPUT = getNode('#address', OFFER_FORM);

const ImageInputs = {
  AVATAR: {
    inputNode: getNode('#avatar', OFFER_FORM),
    previewContainer: getNode('.ad-form-header__preview', OFFER_FORM),
    previewTemplate: getNode('img', getNode('#avatar-preview').content),
    previewDefaultNode: getNode('.ad-form-header__preview img', OFFER_FORM),
  },
  AD_IMAGE: {
    inputNode: getNode('#images', OFFER_FORM),
    previewContainer: getNode('.ad-form__photo', OFFER_FORM),
    previewTemplate: getNode('img', getNode('#ad-preview').content),
  },
};

const ADDRESS_PRECISION = 5;

// -----------------------------------------------------------------------
// function validate and returns error message for title input
const validateTitle = () => {
  if (TITLE_INPUT.validity.valueMissing) {
    return 'Заполните поле';
  } else if (TITLE_INPUT.validity.tooShort) {
    return `Минимальная длина ${TITLE_INPUT.minLength} символов`;
  } else if (TITLE_INPUT.validity.tooLong) {
    return `Максимальная длина ${TITLE_INPUT.maxLength} символов`;
  }

  return '';
};

// -----------------------------------------------------------------------
// function validate and returns error message for price input
const validatePrice = () => {
  if (PRICE_INPUT.validity.valueMissing) {
    return 'Заполните поле';
  } else if (PRICE_INPUT.validity.rangeUnderflow) {
    return `Минимальная цена: ${PRICE_INPUT.min}`;
  } else if (PRICE_INPUT.validity.rangeOverflow) {
    return `Максимальная цена: ${PRICE_INPUT.max}`;
  }

  return '';
};

// -----------------------------------------------------------------------
// function validate and returns error message for capacity input
const validateCapacity = () => {
  const roomNumber = parseInt(ROOM_NUMBER_INPUT.value);
  const capacity = parseInt(CAPACITY_INPUT.value);

  if (CAPACITY_INPUT.validity.valueMissing) {
    return 'Заполните поле';
  } else if (roomNumber === 1 && capacity !== 1) {
    return 'Для одной комнаты только 1 гость';
  } else if (roomNumber === 2 && (capacity < 1 || capacity > 2)) {
    return 'Для двух комнат только 1 или 2 гостя';
  } else if (roomNumber === 3 && (capacity < 1 || capacity > 3)) {
    return 'Для трёх комнат только 1, 2 или 3 гостя';
  } else if (roomNumber === 100 && capacity !== 0) {
    return '100 комнат не для гостей';
  }

  return '';
};

// -----------------------------------------------------------------------
// function returns change handler fot type input
const getPlaceTypeHandler = (priceValidtionFunc) => {
  return () => {
    const type = TYPE_INPUT.value;
    const minAttr = PRICE_INPUT.getAttribute('min');
    const oldMinPrice = parseInt(minAttr ? minAttr : 0);
    const newMinPrice = MinPricesByType[type.toUpperCase()];

    if (newMinPrice === undefined) {
      throw new Error('getPlaceTypeHandler: minPrice was not found');
    }

    if (newMinPrice !== oldMinPrice) {
      PRICE_INPUT.setAttribute('min', newMinPrice);
      PRICE_INPUT.setAttribute('placeholder', newMinPrice);

      //trigger validation for price because attr 'min' was changed
      priceValidtionFunc();
    }
  };
};

// -----------------------------------------------------------------------
// function return handler with input validation
const getInputValidationHandler = (inputNode, validationFunc) => {
  return () => {
    const errorMsg = validationFunc();
    inputNode.setCustomValidity(errorMsg);
    inputNode.reportValidity();
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
// function returns handler for file input
const getFileInputHandler = (previewContainer, imageTemplate) => {
  return (evt) => {
    const file = evt.target.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    const imageNode = imageTemplate.cloneNode(true);

    const fileReader = new FileReader();

    fileReader.addEventListener('load', (evt) => {
      imageNode.setAttribute('src', evt.target.result);

      previewContainer.innerHTML = '';
      previewContainer.append(imageNode);
    });

    fileReader.readAsDataURL(file);
  };
};

const resetImageInputs = () => {
  for (const key of Object.keys(ImageInputs)) {
    const { previewContainer, previewDefaultNode } = ImageInputs[key];
    previewContainer.innerHTML = '';

    if (previewDefaultNode) {
      previewContainer.append(previewDefaultNode);
    }
  }
};

// -----------------------------------------------------------------------
// handler for form submit
const onSubmitForm = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  const onSuccess = () => {
    resetForms();
    resetImageInputs();
    resetMap();
    showSuccessMessage();
  };

  if (evt.target.checkValidity()) {
    sendData(onSuccess, showErrorMessage, formData);
  }
};

// -----------------------------------------------------------------------
// handler for form reset
const onResetButtonClick = (evt) => {
  evt.preventDefault();

  resetForms();
  resetImageInputs();
  resetMap();
};

// -----------------------------------------------------------------------

// validation handlers
const onTitleChange = getInputValidationHandler(TITLE_INPUT, validateTitle);
const onPriceChange = getInputValidationHandler(PRICE_INPUT, validatePrice);
const onCapacityChange = getInputValidationHandler(CAPACITY_INPUT, validateCapacity);

// handler for type input
const onTypeChange = getPlaceTypeHandler(onPriceChange);

// handler for time inputs
const onCheckinChange = getTimeHandler(TIME_IN_INPUT, TIME_OUT_INPUT);
const onCheckoutChange = getTimeHandler(TIME_OUT_INPUT, TIME_IN_INPUT);

// function adds handlers to all inputs in form
const addFormHandlers = () => {
  OFFER_FORM.addEventListener('submit', onSubmitForm);
  OFFER_RESET_BUTTON.addEventListener('click', onResetButtonClick);

  TITLE_INPUT.addEventListener('change', onTitleChange);
  PRICE_INPUT.addEventListener('change', onPriceChange);
  ROOM_NUMBER_INPUT.addEventListener('change', onCapacityChange);
  CAPACITY_INPUT.addEventListener('change', onCapacityChange);

  // trigger handler to make inputs correct even if html is incorrect
  onTypeChange();

  TYPE_INPUT.addEventListener('change', onTypeChange);

  // trigger handler to make inputs correct even if html is incorrect
  onCheckinChange();

  TIME_IN_INPUT.addEventListener('change', onCheckinChange);
  TIME_OUT_INPUT.addEventListener('change', onCheckoutChange);

  // adding handlers for previews
  for (const key of Object.keys(ImageInputs)) {
    const { inputNode, previewContainer, previewTemplate } = ImageInputs[key];
    inputNode.addEventListener('change', getFileInputHandler(previewContainer, previewTemplate));
  }
};

// -----------------------------------------------------------------------
// function updates value of address input
const updateAddress = (coords) => {
  ADDRESS_INPUT.value = `${coords.lat.toFixed(ADDRESS_PRECISION)}, ${coords.lng.toFixed(ADDRESS_PRECISION)}`;
};

// -----------------------------------------------------------------------
// EXPORTS
export { addFormHandlers, updateAddress };
