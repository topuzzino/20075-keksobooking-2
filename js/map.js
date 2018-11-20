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
var PRICE_TEXT = '₽/ночь';
var ROOMS_TEXT = ' комнаты для ';
var GUESTS_TEXT = ' гостей';
var CHECKIN_TEXT = 'Заезд после ';
var CHECKOUT_TEXT = ', выезд до ';

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

// We are forming here an array of avatars and mix them
var avatars = [];
for (var i = 1; i <= ADS_AMOUNT; i++) {
  if (i < 10) {
    avatars.push('0' + i);
  } else {
    avatars.push('' + i);
  }
}
avatars.sort(compareRandom);

// Finding the map in DOM and show it
var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');


// Finding the block, where we'll be putting the elements and templates
var mapPinsList = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var photoTemplate = document.querySelector('template').content.querySelector('.popup__photo');


// Mixing the names in random order, we don't need them repeat
var adTitle = OFFER_TITLES.sort(compareRandom);

// Forming the array of our ads
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


// Function for creating pins for the map with the data from the array
var renderMapPin = function (mapPin) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = mapPin.location.x - PIN_WIDTH / 2 + 'px';
  mapPinElement.style.top = mapPin.location.y - PIN_HEIGHT + 'px';
  mapPinElement.querySelector('img').src = mapPin.author.avatar;
  mapPinElement.querySelector('img').alt = mapPin.offer.title;
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

renderMapPinsList();

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

// Function for creating a DOM-element of the ad and filling in the data from the array
var renderMapCard = function (mapCard) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + PRICE_TEXT;
  var offerType = mapCardElement.querySelector('.popup__type');
  if (mapCard.offer.type === 'flat') {
    offerType.textContent = 'Квартира';
  } else if (mapCard.offer.type === 'bungalo') {
    offerType.textContent = 'Бунгало';
  } else if (mapCard.offer.type === 'house') {
    offerType.textContent = 'Дом';
  } else {
    offerType.textContent = 'Дворец';
  }
  mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ROOMS_TEXT + mapCard.offer.guests + GUESTS_TEXT;
  mapCardElement.querySelector('.popup__text--time').textContent = CHECKIN_TEXT + mapCard.offer.checkin + CHECKOUT_TEXT + mapCard.offer.checkout;
  mapCardElement.querySelector('.popup__features').innerHTML = '';
  mapCardElement.querySelector('.popup__features').appendChild(renderFeaturesList(mapCard.offer.features));
  mapCardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
  mapCardElement.querySelector('.popup__photos').innerHTML = '';
  mapCardElement.querySelector('.popup__photos').appendChild(renderPhotosList(mapCard.offer.photos));
  mapCardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;
  return mapCardElement;
};

// Function for placing the ad into the html-layout
var insertMapCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(advertisments[0]));
  mapElement.insertBefore(fragment, mapFilters);
};
insertMapCard();
