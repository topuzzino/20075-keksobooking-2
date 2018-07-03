'use strict';

(function () {
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
    adElement.querySelector('.popup__type').textContent = window.data.getTypeValue(card.offer.type);
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
    makePin(window.data.objectsList);
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
      if (window.data.objectsList[pinId]) {
        pinContainer.appendChild(makeAd(window.data.objectsList[pinId]));
        closeAd();
      }
    }
  };


  pinContainer.addEventListener('click', mouseOnPinHandler);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      deleteOldAd();
    }
  });

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

  window.pins = {
    form: form
  }
})();
