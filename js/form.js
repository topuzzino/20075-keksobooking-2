'use strict';

(function () {
  // синхронизация полей ввода типа аппартаментов и их мин цены
  var flatType = document.getElementById('type');
  var flatPrice = document.getElementById('price');

  var minPrice = [0, 1000, 5000, 10000];
  var flatTypeArray = Array.from(flatType.options);

  var getMinPriceToType = function () {
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
    var capacityArray = Array.from(guestNumber.options);
    var currentRoom = roomNumber.value;
    var maxCapacity = roomNumberToCapacity[currentRoom];

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

  window.pins.form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.pins.form), function () {
      window.pins.form.reset();
    }, function (message) {
      window.utils.errorObject(message);
    });
    evt.preventDefault();
  });
})();
