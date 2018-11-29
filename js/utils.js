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

    // Function for changing the end suffix of the nouns in the ads
    setDeclension: function (number, array) {
      if ((number % 100 < 20) && (number % 100 >=5)) {
        return array[2];
      }
      if (number % 10 === 1) {
        return array[0];
      } else if ((number % 10 > 1) && (number % 10 < 5)) {
        return array[1];
      } else {
        return array[2];
      }
    }
  };
})();
