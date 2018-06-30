'use strict';

var OBJECT_NUMBER = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_X = 300;
var MAX_X = 900;

var MIN_Y = 130;
var MAX_Y = 630;

var ESC_KEYCODE = 27;

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

var typeArray = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


// функция получает рандомное число между min и max
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};


// функция рандомно перемешивает элементы массива, не повторяя их
var randomShuffleArray = function (arr) {
  var m = arr.length;
  var t;
  var i;

  // While there remain elements to shuffle …
  while (m) {
    // Pick a remaining element …
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};


function getUserAvatar(index) {
  return 'img/avatars/user0' + index + '.png';
}
function getSchuffledAvatarArray(count) {
  var avatars = [];
  for (var i = 1; i <= count; i++) {
    avatars.push(getUserAvatar(i));
  }
  return randomShuffleArray(avatars);
}


var getTitle = function (titleArray) {
  var titleIndex = randomNumber(0, titleArray.length);
  return titleArray[titleIndex];
};


var getAddress = function (x, y) {
  return x + ', ' + y;
};


var getTypeValue = function (type) {
  return typeArray[type];
};


var getType = function (types) {
  var type = Object.keys(types);
  var typeIndex = randomNumber(0, type.length);
  return type[typeIndex];
};


// "checkin" / "checkout" : строка с одним из трёх значений: 12:00, 13:00 или 14:00,
var getRandomTime = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};


var getFeatures = function (features) {
  var featuresIndex = randomNumber(1, features.length);
  var randomFeatures = [];
  for (var i = 0; i < featuresIndex; i++) {
    randomFeatures.push(features[i]);
  }
  return randomFeatures;
};


var getPhotos = function (photos) {
  return randomShuffleArray(photos);
};


// функция генерирует объекты в ходе цикла
var generateObjectList = function (objNumber) {
  var shuffledAvatarArray = getSchuffledAvatarArray(objNumber);
  var objectsList = [];
  var objectItem = {};

  var locationX = '';
  var locationY = '';
  var time = '';

  for (var i = 0; i < objNumber; i++) {

    locationX = randomNumber(MIN_X, MAX_X);
    locationY = randomNumber(MIN_Y, MAX_Y);
    time = getRandomTime();


    objectItem = {
      'author': {
        'avatar': shuffledAvatarArray[i]
      },

      'offer': {
        'title': getTitle(TITLES),
        'address': getAddress(locationX, locationY),
        'price': randomNumber(MIN_PRICE, MAX_PRICE),
        'type': getType(typeArray),
        'rooms': randomNumber(MIN_ROOMS, MAX_ROOMS), // "rooms": число, случайное количество комнат от 1 до 5
        'guests': randomNumber(MIN_ROOMS * 2, MAX_ROOMS * 3), // "guests": число, случайное количество гостей, которое можно разместить
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


// отрисовывает пины и помещает их на карту
var makePin = function (objList) {
  // находит шаблон для отрисовки пина на карте
  var pinTemplate = document.querySelector('.map__pins');
  var similarPin = document.querySelector('template').content.querySelector('.map__pin');

  objList.forEach(function (obj, objIndex) {
    var pinElement = similarPin.cloneNode(true);
    var img = pinElement.querySelector('img');
    pinElement.style.left = obj.location.x - img.width / 2 + 'px';
    pinElement.style.top = obj.location.y - img.height + 'px';
    img.src = obj.author.avatar;
    img.alt = obj.offer.title;
    pinElement.setAttribute('data-ad-number', objIndex);

    // создает контейнер для будущих данных
    var fragment = document.createDocumentFragment();
    fragment.appendChild(pinElement);
    pinTemplate.appendChild(fragment);
  });
};


var renderFeatures = function (features) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + features[i]);
    featureFragment.appendChild(newElement);
  }
  return featureFragment;
};


// фотки
var renderPhotos = function (photos) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoItem = document.createElement('img');
    // <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    photoItem.classList.add('popup__photo');
    photoItem.src = photos[i];
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photoItem.alt = 'Фотография жилья';
    photosFragment.appendChild(photoItem);
    // console.log(photosFragment);
  }
  return photosFragment;
};


// отрисовывает квартирные карточки с объявами
var makeAd = function (card) {
  // находит шаблон для отрисовки квартирной карточки
  var adTemplate = document.querySelector('template').content.querySelector('.map__card');
  var adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = card.offer.title;
  adElement.querySelector('.popup__text--address').textContent = card.offer.address;
  adElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = getTypeValue(card.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  adElement.querySelector('.popup__features').textContent = '';
  adElement.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
  adElement.querySelector('.popup__description').textContent = card.offer.description;
  adElement.querySelector('.popup__photos').textContent = '';
  adElement.querySelector('.popup__photos').appendChild(renderPhotos(card.offer.photos));
  adElement.querySelector('.popup__avatar').src = card.author.avatar;

  return adElement;
};


// -------------

// неактивное состояние в самом начале
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var addressValue = form.querySelector('#address');

var MAIN_PIN_WIDTH = mainPin.querySelector('img').width;
var MAIN_PIN_HEIGHT = mainPin.querySelector('img').height;


var setDefaultAddress = function () {
  var MAIN_PIN_X = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
  var MAIN_PIN_Y = parseInt(mainPin.style.top, 10) - MAIN_PIN_HEIGHT / 2;
  // console.log(MAIN_PIN_X, MAIN_PIN_Y);
  addressValue.value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
};

form.classList.add('ad-form--disabled');

var activateMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  makePin(objectsList);
  document.querySelectorAll('form fieldset').disabled = false;
};


var pinContainer = document.querySelector('.map__pins');


var closeAd = function () {
  var popup = map.querySelector('.map__card.popup');
  var popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    popupClose.parentElement.remove();
  });
};


var deleteOldAd = function () {
  var oldAd = map.querySelector('.map__card.popup');
  if (oldAd) {
    oldAd.remove();
  }
};

var mouseOnPinHandler = function (evt) {
  evt.preventDefault();
  var clickedPin = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (clickedPin) {
    // clickedPin.classList.add('map__pin--active');
    deleteOldAd();
    var pinId = clickedPin.dataset.adNumber;
    if (objectsList[pinId]) {
      pinContainer.appendChild(makeAd(objectsList[pinId]));
      closeAd();
    }
  }
};


pinContainer.addEventListener('click', mouseOnPinHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    deleteOldAd();
  }
});

// -------------


// синхронизация полей ввода типа аппартаментов и их мин цены
var flatType = document.getElementById('type');
var flatPrice = document.getElementById('price');

var minPrice = [0, 1000, 5000, 10000];
var flatTypeArray = Array.from(flatType.options);
// console.log(flatTypeArray);

var getMinPriceToType = function () {
  // var currentType = flatType.value;
  // console.log(currentType);

  flatTypeArray.forEach(function (option, index) {
    if (option.selected) {
      flatPrice.min = minPrice[index];
      flatPrice.placeholder = minPrice[index];
    }
  });
};

getMinPriceToType();

flatType.addEventListener('change', getMinPriceToType);


// синхронизация полей чекина и чекаута
var checkin = document.getElementById('timein');
var checkout = document.getElementById('timeout');

checkin.addEventListener('change', function () {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', function () {
  checkin.value = checkout.value;
});


// синхронизация поля "количество комнат" с полем "Количество мест"
var roomNumber = document.getElementById('room_number');
var guestNumber = document.getElementById('capacity');


var roomNumberToCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var getRoomGuestsSynch = function () {
  // var roomArray = Array.from(roomNumber.options);
  var capacityArray = Array.from(guestNumber.options);

  var currentRoom = roomNumber.value;
  // console.log('currentRoom: ' + currentRoom);
  // var currentGuests = guestNumber.value;
  // console.log('currentGuests: ' + currentGuests);

  var maxCapacity = roomNumberToCapacity[currentRoom];
  // console.log('maxCapacity: ' + maxCapacity);

  capacityArray.forEach(function (option) {
    if (maxCapacity.includes(option.value)) {
      option.disabled = false;
      option.selected = true;
    } else {
      option.selected = false;
      option.disabled = true;
    }
  });
};
getRoomGuestsSynch();
roomNumber.addEventListener('change', getRoomGuestsSynch);
// guestNumber.addEventListener('change', );


// -------------

var mainPinArrow = 22;
var mainPinFullHeight = MAIN_PIN_HEIGHT + mainPinArrow;

var TOP_BORDER = 130 - mainPinFullHeight;
var BOTTOM_BORDER = 630 - mainPinFullHeight;

var LEFT_BORDER = map.offsetLeft + MAIN_PIN_WIDTH / 2;
var RIGHT_BORDER = map.offsetLeft + map.clientWidth - MAIN_PIN_WIDTH / 2;


mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  activateMap(evt);

  var startCoord = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };

    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (startCoord.x >= LEFT_BORDER && startCoord.x <= RIGHT_BORDER && startCoord.y >= TOP_BORDER && startCoord.y <= BOTTOM_BORDER) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

    setDefaultAddress();
  };


  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    setDefaultAddress();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
