'use strict';

(function () {
  window.utils = {
    randomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    randomItem: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    randomShuffleArray: function (arr) {
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
    }
  }

})();
