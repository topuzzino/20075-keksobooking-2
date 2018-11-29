'use strict';

// Block for working with the form
(function () {
  var MAX_ROOM_NUMBER = 100;
  var NO_GUEST_VALUE = 0;
  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var priceInput = adForm.querySelector('#price');
  var typeField = adForm.querySelector('#type');
  var checkInField = adForm.querySelector('#timein');
  var checkOutField = adForm.querySelector('#timeout');
  var capacityField = adForm.querySelector('#capacity');
  var roomNumberField = adForm.querySelector('#room_number');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var successElement = document.querySelector('.success');

  // Initial setting of the map: adding the attribut "disabled" to the fields
  var disableForm = function () {
    adFormFieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  // Function for activating the form
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // Function for setting correlation between type of appartment and min price
  var setMinPrice = function (price) {
    priceInput.min = price;
    priceInput.placeholder = price;
  };

  typeField.addEventListener('change', function (evt) {
    setMinPrice(minPrice[evt.target.value]);
  });

  // By pressing "submit" prove that the price is not less than minimal set for the appartment type
  var submit = adForm.querySelector('.ad-form__element--submit');
  submit.addEventListener('click', function () {
    priceInput.min = minPrice[typeField.value];
  });

  // Setting the correlation between check-in and check-out
  checkInField.addEventListener('change', function (evt) {
    checkOutField.value = evt.target.value;
  });

  checkOutField.addEventListener('change', function (evt) {
    checkInField.value = evt.target.value;
  });

  // Disable the choice of the guests before the quantity of rooms, initial choice of guest number
  var setInitialCapacity = function () {
    var capacityOption = capacityField.querySelectorAll('option');
    capacityOption.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');

      if (item.selected) {
        item.removeAttribute('disabled');
      }
    });
  };
  setInitialCapacity();

  // Setting the correlation between quantity of rooms and guests
  var setCapacity = function (evt) {
    if (+roomNumberField.value === MAX_ROOM_NUMBER) {
      capacityField.value = NO_GUEST_VALUE;
    } else {
      capacityField.value = roomNumberField.value;
    }

    for (var i = 0; i < capacityField.length; i++) {
      var option = capacityField.options[i];
      var noGuests = +option.value === NO_GUEST_VALUE;
      var tooManyGuests = +option.value > +evt.target.value;
      if (+evt.target.value !== MAX_ROOM_NUMBER) {
        option.disabled = noGuests || tooManyGuests;
      } else {
        option.disabled = !noGuests;
      }
    }
  };

  roomNumberField.addEventListener('change', setCapacity);

  // Function for для filling in the fields in the form, according to the x & y position of the main pin
  var setAddress = function (height) {
    var mainPinX = Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    var mainPinY = Math.round(mainPin.offsetTop + height);
    addressInput.value = mainPinX + ', ' + mainPinY;
  };

  // Adding the red error frame to invalid elements and deleting it by corrections
  var inputs = adForm.querySelectorAll('input, select, textarea');
  inputs.forEach(function (input) {
    input.addEventListener('invalid', function () {
      input.classList.add('error');
    });
    input.addEventListener('input', function () {
      if (input.validity.valid) {
        input.classList.remove('error');
      }
    });
  });

  // Function for resetting the form
  var resetForm = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    inputs.forEach(function (input) {
      input.classList.remove('error');
    });
  };

  // Function for deactivating the page
  var deactivatePage = function () {
    resetForm();
    window.map.resetMap();
    window.map.setInitialPage();
  };

  // Set the page to initial inactive setting
  resetButton.addEventListener('click', function () {
    deactivatePage();
  });

  // The popup with the message of successful filling out the form
  var closeSuccessElement = function () {
    successElement.classList.add('hidden');
    document.removeEventListener('click', closeSuccessElement);
    document.removeEventListener('keydown', successElementEscPressHandler);
  };

  var successElementEscPressHandler = function (evt) {
    window.utils.isEscKeycode(evt, closeSuccessElement);
  };

  var adFormSubmitSuccessHandler = function () {
    deactivatePage();
    successElement.classList.remove('hidden');
    document.activeElement.blur();
    document.addEventListener('click', closeSuccessElement);
    document.addEventListener('keydown', successElementEscPressHandler);
  };

  // The popup with the message of error
  var adFormSubmitErrorHandler = function (errorMessage) {
    window.createErrorMessage(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(adFormSubmitSuccessHandler, adFormSubmitErrorHandler, new FormData(adForm));
    evt.preventDefault();
  });

  window.form = {
    disableForm: disableForm,
    activateForm: activateForm,
    setAddress: setAddress,
  };
})();
