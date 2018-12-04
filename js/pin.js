'use strict';

// Block for creating and placing the pins into the HTML-layout
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var PIN_NUMBER = 5;

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPins = [];

  // Function for creating pins for the map with the data from the array
  var renderMapPin = function (mapPin) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = mapPin.location.x - PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = mapPin.location.y - PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = mapPin.author.avatar;
    mapPinElement.querySelector('img').alt = mapPin.offer.title;

    mapPinElement.addEventListener('click', function () {
      window.card.openMapCard(mapPin);
    });

    mapPinElement.addEventListener('keydown', function (evt) {
      window.utils.isEnterKeycode(evt, window.card.openMapCard, mapPin);
    });

    mapPins.push(mapPinElement);
    return mapPinElement;
  };

  // Function for placing the pins into the block (successful download of data from the server)
  var renderMapPinsList = function (advertisments) {
    var pinsNumber = advertisments.length > PINS_NUMBER ? PINS_NUMBER : advertisments.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsNumber; i++) {
      fragment.appendChild(renderMapPin(advertisments[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  // Successful data download from the server
  var loadSuccessHandler = function (advertisments) {
    renderMapPinsList(advertisments);
    window.filters.getAdvertsData(advertisments);
    window.filters.activateFilters();
  };

  // Popup with the error message in case of unsuccessful download
    var loadErrorHandler = function (errorMessage) {
      window.createErrorMessage(errorMessage);
    };

  // Function for removing the pins from the map
  var removeMapPins = function () {
    mapPins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    loadSuccessHandler: loadSuccessHandler,
    loadErrorHandler: loadErrorHandler,
    removeMapPins: removeMapPins,
    renderMapPinsList: renderMapPinsList
  };
})();
