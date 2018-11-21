'use strict';

// Data for the array of ads
var ADS_AMOUNT = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_PATH = 'img/avatars/user';
var AVATAR_FILE_TYPE = '.png';
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 100;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var LOCATION_MIN_X = 300;
var LOCATION_MAX_X = 900;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var INITIAL_MAIN_PIN_HEIGHT = 65;
var INITIAL_MAIN_PIN_WIDTH = 65;
var ACTIVE_MAIN_PIN_HEIGHT = 77;
var PRICE_TEXT = '₽/ночь';
var ROOMS_TEXT = ' комнаты для ';
var GUESTS_TEXT = ' гостей';
var CHECKIN_TEXT = 'Заезд после ';
var CHECKOUT_TEXT = ', выезд до ';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Finding nessersary elements in DOM
var mapElement = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var photoTemplate = document.querySelector('template').content.querySelector('.popup__photo');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mainPin = mapElement.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');

// Function for getting a random element from an array
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Function for getting a random number from a range
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Function for getting a random order of elements in an array
var compareRandom = function () {
  return Math.random() - 0.5;
};

// Function for getting an array with mixed elements of different length
var getArrayLength = function (array) {
  var arrayRandom = array.sort(compareRandom);
  var arrayClone = arrayRandom.slice();
  arrayClone.length = getRandomNumber(1, array.length);
  return arrayClone;
};

// Initial setting of the map: adding the attribut "disabled" to the fields
var disableForm = function () {
  adFormFieldsets.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
};

// Function for showing/activating the map
var enableMap = function () {
  mapElement.classList.remove('map--faded');
};

// Function for activating the form
var enableForm = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};

// Function for для filling in the fields in the form, according to the x & y position of the main pin
var setAddress = function (height) {
  var mainPinX = Math.round(mainPin.offsetLeft + INITIAL_MAIN_PIN_WIDTH / 2);
  var mainPinY = Math.round(mainPin.offsetTop + height);
  addressInput.value = mainPinX + ', ' + mainPinY;
};

// We are forming here an array of avatars and mix them
var getAvatarsArray = function () {
  var avatars = [];
  for (var i = 1; i <= ADS_AMOUNT; i++) {
    if (i < 10) {
      avatars.push('0' + i);
    } else {
      avatars.push('' + i);
    }
  }
  return avatars.sort(compareRandom);
};

var avatars = getAvatarsArray();

// Mixing the names in random order, we don't need them repeat
var adTitle = OFFER_TITLES.sort(compareRandom);

// Forming the array of our ads
var createAdvertismentsArray = function (advertismentsCount) {
  var advertisments = [];
  for (var i = 0; i < ADS_AMOUNT; i++) {
    var locationX = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    advertisments.push({
      author: {
        avatar: AVATAR_PATH + avatars[i] + AVATAR_FILE_TYPE
      },
      offer: {
        title: adTitle[i],
        address: (locationX + ', ' + locationY),
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomElement(CHECK_TIMES),
        checkout: getRandomElement(CHECK_TIMES),
        features: getArrayLength(FEATURES),
        description: '',
        photos: PHOTOS.sort(compareRandom)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return advertisments;
};

var advertisments = createAdvertismentsArray(ADS_AMOUNT);

// Function for creating pins for the map with the data from the array
var renderMapPin = function (mapPin) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = mapPin.location.x - PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = mapPin.location.y - PIN_HEIGHT + 'px';
  mapPinElement.querySelector('img').src = mapPin.author.avatar;
  mapPinElement.querySelector('img').alt = mapPin.offer.title;

  mapPinElement.addEventListener('click', function () {
    openMapCard(mapPin);
  });

  mapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMapCard(mapPin);
    }
  });

  return mapPinElement;
};

// Function for placing the pins into the block
var renderMapPinsList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisments.length; i++) {
    fragment.appendChild(renderMapPin(advertisments[i]));
  }
  mapPinsList.appendChild(fragment);
};

// Function for translating the flat types
var translateType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
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

var OnMapCardEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeMapCard();
  }
};

// Function for creating a DOM-element of the ad and filling in the data from the array
var renderMapCard = function (mapCard) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + PRICE_TEXT;

  mapCardElement.querySelector('.popup__type').textContent = translateType(mapCard.offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ROOMS_TEXT + mapCard.offer.guests + GUESTS_TEXT;
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
    if (evt.keyCode === ENTER_KEYCODE) {
      closeMapCard();
    }
  });
  document.addEventListener('keydown', OnMapCardEscPress);

  return mapCardElement;
};

// Function for placing the ad into the html-layout - open the nessesary ad and close previos one
var openMapCard = function (mapCard) {
  var card = mapElement.querySelector('.map__card');
  if (card) {
    closeMapCard();
  }
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(mapCard));
  mapElement.insertBefore(fragment, mapFilters);
};

// Close the ad, remove the event listener
var closeMapCard = function () {
  var popup = document.querySelector('.map__card');
  mapElement.removeChild(popup);
  document.removeEventListener('keydown', OnMapCardEscPress);
};

// Event listener for the main pin
var mainPinMouseupHandler = function () {
  enableMap();
  enableForm();
  renderMapPinsList();
  setAddress(ACTIVE_MAIN_PIN_HEIGHT);
  mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
};

// Function for activation of the page
var enablePage = function () {
  disableForm();
  setAddress(INITIAL_MAIN_PIN_HEIGHT / 2);
  mainPin.addEventListener('mouseup', mainPinMouseupHandler);
};

enablePage();
