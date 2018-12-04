'use strict';

// Block for utilits
(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  // Function for pressing the hot keys
  var isEscKeycode = function (evt, action) {
    if (evt.keyCode === Keycode.ESC) {
      action();
    }
  };

  var isEnterKeycode = function (evt, action, data) {
    if (evt.keyCode === Keycode.ENTER) {
      action(data);
    }
  };

  // Function for changing the end suffix of the nouns in the ads
  var setDeclension = function (number, array) {
    if ((number % 100 < 20) && (number % 100 >= 5)) {
      return array[2];
    }
    if (number % 10 === 1) {
      return array[0];
    } else if ((number % 10 > 1) && (number % 10 < 5)) {
      return array[1];
    } else {
      return array[2];
    }
  };

  // Function for debounce
  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    isEscKeycode: isEscKeycode,
    isEnterKeycode: isEnterKeycode,
    setDeclension: setDeclension,
    debounce: debounce
  };
})();
