'use strict';

(function () {

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

  var errorObject = function (message) {
    var errorRect = document.createElement('div');
    var errorText = document.createElement('p');
    var errorButton = document.createElement('button');
    errorText.textContent = message;
    errorButton.textContent = 'OK';
    errorRect.style = 'width: 200px; height: 100px; background-color: white; color: black; border: 3px solid red; text-align: center';
    document.body.insertAdjacentElement('afterbegin', errorRect);
  };


  window.utils = {
    randomNumber: randomNumber,
    randomItem: randomItem,
    randomShuffleArray: randomShuffleArray,
    errorObject: errorObject
  };
})();
