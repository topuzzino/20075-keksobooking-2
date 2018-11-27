'use strict';

// Block for utilits
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    //Function for pressing hot keys
    isEscKeycode: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterKeycode: function (evt, action, data) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(data);
      }
    },

    // Function for getting a random element from an array
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    // Function for getting a random number from a range
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // Function for getting a random order of elements in an array
    compareRandom: function () {
      return Math.random() - 0.5;
    },

    // Function for getting an array with mixed elements of different length
    getArrayLength: function (array) {
      var arrayRandom = array.sort(window.utils.compareRandom);
      var arrayClone = arrayRandom.slice();
      arrayClone.length = window.utils.getRandomNumber(1, array.length);
      return arrayClone;
    }
  };
})();
