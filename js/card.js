'use strict';

// Block for creating and placing the ad cards into the HTML-layout
(function () {
  var PRICE_TEXT = '₽/night';
  var ROOMS_TEXT_ARRAY = ['room', 'room', 'rooms'];
  var GUESTS_TEXT_ARRAY = ['guest', 'guests', 'guests'];
  var CHECKIN_TEXT = 'Check-in after ';
  var CHECKOUT_TEXT = ', check-out till ';

  var mapFilters = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('template').content.querySelector('.popup__photo');

  // Function for translating the flat types
  var translateType = function (type) {
    switch (type) {
      case 'flat':
        return 'flat';
      case 'bungalo':
        return 'bungalo';
      case 'house':
        return 'house';
      case 'palace':
        return 'palace';
      default:
        return type;
    }
  };

  // Function for creating list of features
  var renderFeaturesList = function (featuresList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < featuresList.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + featuresList[i]);
      fragment.appendChild(featureItem);
    }
    return fragment;
  };

  // Function for creating the list of photos
  var renderPhotosList = function (photosList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosList.length; i++) {
      var photoElement = photoTemplate.cloneNode();
      photoElement.src = photosList[i];
      fragment.appendChild(photoElement);
    }
    return fragment;
  };

  var MapCardEscPressHandler = function (evt) {
    window.utils.isEscKeycode(evt, closeMapCard);
  };

  // Function for creating a DOM-element of the ad and filling in the data from the array
  var renderMapCard = function (mapCard) {
    var mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + PRICE_TEXT;
    mapCardElement.querySelector('.popup__type').textContent = translateType(mapCard.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' ' + window.utils.setDeclension(mapCard.offer.rooms, ROOMS_TEXT_ARRAY) + ' для ' + mapCard.offer.guests + ' ' + window.utils.setDeclension(mapCard.offer.guests, GUESTS_TEXT_ARRAY);     mapCardElement.querySelector('.popup__text--time').textContent = CHECKIN_TEXT + mapCard.offer.checkin + CHECKOUT_TEXT + mapCard.offer.checkout;
    mapCardElement.querySelector('.popup__text--time').textContent = CHECKIN_TEXT + mapCard.offer.checkin + CHECKOUT_TEXT + mapCard.offer.checkout;
    mapCardElement.querySelector('.popup__features').innerHTML = '';
    mapCardElement.querySelector('.popup__features').appendChild(renderFeaturesList(mapCard.offer.features));
    mapCardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
    mapCardElement.querySelector('.popup__photos').innerHTML = '';
    mapCardElement.querySelector('.popup__photos').appendChild(renderPhotosList(mapCard.offer.photos));
    mapCardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;

    var popupClose = mapCardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', closeMapCard);
    popupClose.addEventListener('keydown', function (evt) {
      window.utils.isEnterKeycode(evt, closeMapCard);
    });
    document.addEventListener('keydown', MapCardEscPressHandler);

    return mapCardElement;
  };

  // Function for placing the ad into the html-layout - open the nessesary ad and close previos one
  var openMapCard = function (mapCard) {
    var card = window.map.mapElement.querySelector('.map__card');
    if (card) {
      closeMapCard();
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(mapCard));
    window.map.mapElement.insertBefore(fragment, mapFilters);
  };

  // Close the ad, remove the event listener
  var closeMapCard = function () {
    var popup = document.querySelector('.map__card');
    if (!popup) {
      return;
    }
    window.map.mapElement.removeChild(popup);
    document.removeEventListener('keydown', MapCardEscPressHandler);
  };

  window.card = {
    openMapCard: openMapCard,
    closeMapCard: closeMapCard
  };

})();
