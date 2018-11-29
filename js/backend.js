'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var getXHR = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Error. Please refresh the page. Response status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Network error');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send((data) ? data : '');
  };

  window.backend = {
    upload: function (onLoad, onError, data) {
      getXHR(onLoad, onError, 'POST', URL_UPLOAD, data);
    },
    load: function (onLoad, onError) {
      getXHR(onLoad, onError, 'GET', URL_LOAD);
    }
  };
})();
