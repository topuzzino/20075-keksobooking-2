'use strict';

document.querySelector('.map').classList.remove('map--faded');

// функция получает рандомное число между min и max
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
}


// функция рандомно перемешивает элементы массива, не повторяя их
var randomShuffleArray = function (array) {
  var m = array.length;
  var t;
  var i;

  // While there remain elements to shuffle …
  while (m) {
    // Pick a remaining element …
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};


/*
"author": {
    "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
*/
var avatarArray = [];
var OBJECT_NUMBER = 8;

var getAvatar = function (arr) {
  for (var i = 1; i <= OBJECT_NUMBER; i++) {
    arr.push('img/avatars/user0' + i + '.png');
  }
  return arr = randomShuffleArray(arr);
}
console.log('getAvatar:' + getAvatar(avatarArray));


/*
"offer": {
    "title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира",
    "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец",
    "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде". Значения не должны повторяться.
*/
var titleArray = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var getTitle = function () {
  return randomShuffleArray(titleArray);
}
console.log('getTitle:' + getTitle(titleArray));

/*
"address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
*/

var getAddress = function (x, y) {
  return x + ', ' + y
}
console.log('getAddress:' + getAddress(600, 350));

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

/*
"price": число, случайная цена от 1000 до 1 000 000
*/
var getPrice = randomNumber(MIN_PRICE, MAX_PRICE);
console.log('getPrice:' + getPrice);

/*
"type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
*/
var typeArray = ['palace', 'flat', 'house', 'bungalo'];

var getType = function () {
  return randomShuffleArray(typeArray);
}
console.log('getType:' + getType(typeArray));

/*
"rooms": число, случайное количество комнат от 1 до 5
*/
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var getRooms = randomNumber(MIN_ROOMS, MAX_ROOMS);
console.log('getRooms:' + getRooms);

/*
"guests": число, случайное количество гостей, которое можно разместить
*/
var getGuests = randomNumber(MIN_ROOMS * 5, MAX_ROOMS * 5);
console.log('getGuests:' + getGuests);

/*
"checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
*/
var getCheckin = function () {
  return randomItem(['12:00', '13:00', '14:00']);
}
console.log('getCheckin:' + getCheckin());

/*
"checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
*/
var getCheckout = function () {
  return randomItem(['12:00', '13:00', '14:00']);
}
console.log('getCheckout:' + getCheckout());

/*
"features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
*/

var getFeatures = function () {
  var featuresArray = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
  var featuresRandomSort = randomShuffleArray(featuresArray);
  var featuresSize = randomNumber(1, featuresRandomSort.length);
  var features = [];
  for (var i = 0; i < featuresSize; i++) {
    features.push(featuresRandomSort[i]);
  }
  return features;
}
console.log('features:' + getFeatures());

/*
"description": пустая строка
*/

var getDescription = function () {
  return '';
}

/*
"photos": массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
"http://o0.github.io/assets/images/tokyo/hotel2.jpg" и
"http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
*/
var photosArray = [' http://o0.github.io/assets/images/tokyo/hotel1.jpg', ' http://o0.github.io/assets/images/tokyo/hotel2.jpg', ' http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var getPhotos = function () {
  return randomShuffleArray(photosArray);
}
console.log('getPhotos:' + getPhotos());

/*
"x": случайное число, координата x метки на карте от 300 до 900,
"y": случайное число, координата y метки на карте от 130 до 630
*/
var MIN_X = 300;
var MAX_X = 900;

var MIN_Y = 130;
var MAX_Y = 630;

var getLocationX = function () {
  return randomNumber(MIN_X, MAX_X);
}

var getLocationY = function () {
  return randomNumber(MIN_Y, MAX_Y);
}
console.log('getLocationX:' + getLocationX() + '; getLocationY:' + getLocationY());

