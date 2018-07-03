'use strict';

(function () {

  /*
  var OBJECT_NUMBER = 8;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_X = 300;
  var MAX_X = 900;

  var MIN_Y = 130;
  var MAX_Y = 630;
  */
  var ESC_KEYCODE = 27;

  /*
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  */
  var typeArray = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  /*
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  */
  function getTypeValue(type) {
    return typeArray[type];
  }
  /*
  function getUserAvatar(index) {
    return 'img/avatars/user0' + index + '.png';
  }
  function getSchuffledAvatarArray(count) {
    var avatars = [];
    for (var i = 1; i <= count; i++) {
      avatars.push(getUserAvatar(i));
    }
    return window.utils.randomShuffleArray(avatars);
  }


  var getTitle = function (titleArray) {
    var titleIndex = window.utils.randomNumber(0, titleArray.length);
    return titleArray[titleIndex];
  };


  var getAddress = function (x, y) {
    return x + ', ' + y;
  };


  var getType = function (types) {
    var type = Object.keys(types);
    var typeIndex = window.utils.randomNumber(0, type.length);
    return type[typeIndex];
  };


  // "checkin" / "checkout" : строка с одним из трёх значений: 12:00, 13:00 или 14:00,
  var getRandomTime = function () {
    return window.utils.randomItem(['12:00', '13:00', '14:00']);
  };


  var getFeatures = function (features) {
    var featuresIndex = window.utils.randomNumber(1, features.length);
    var randomFeatures = [];
    for (var i = 0; i < featuresIndex; i++) {
      randomFeatures.push(features[i]);
    }
    return randomFeatures;
  };


  var getPhotos = function (photos) {
    return window.utils.randomShuffleArray(photos);
  };
  */

  var objectsList = [];

  var generateObjectList = function (data) {
    data.forEach(function (objectItem) {
      objectsList.push(objectItem);
    });
  };

  /*
  // функция генерирует объекты в ходе цикла
  var generateObjectList = function (objNumber) {
    var shuffledAvatarArray = getSchuffledAvatarArray(objNumber);
    var objectsList = [];
    var objectItem = {};

    var locationX = '';
    var locationY = '';
    var time = '';

    for (var i = 0; i < objNumber; i++) {

      locationX = window.utils.randomNumber(MIN_X, MAX_X);
      locationY = window.utils.randomNumber(MIN_Y, MAX_Y);
      time = getRandomTime();


      objectItem = {
        'author': {
          'avatar': shuffledAvatarArray[i]
        },

        'offer': {
          'title': getTitle(TITLES),
          'address': getAddress(locationX, locationY),
          'price': window.utils.randomNumber(MIN_PRICE, MAX_PRICE),
          'type': getType(typeArray),
          'rooms': window.utils.randomNumber(MIN_ROOMS, MAX_ROOMS), // "rooms": число, случайное количество комнат от 1 до 5
          'guests': window.utils.randomNumber(MIN_ROOMS * 2, MAX_ROOMS * 3), // "guests": число, случайное количество гостей, которое можно разместить
          'checkin': time,
          'checkout': time,
          'features': getFeatures(featuresArray),
          'description': '',
          'photos': getPhotos(PHOTOS)
        },

        'location': {
          'x': locationX,
          'y': locationY
        }
      };
      objectsList.push(objectItem);
    }
    return objectsList;
  };
  var objectsList = generateObjectList(OBJECT_NUMBER);
  */

  window.backend.load(generateObjectList, window.utils.errorObject);

  window.data = {
    objectsList: objectsList,
    ESC_KEYCODE: ESC_KEYCODE,
    getTypeValue: getTypeValue
  };

})();
