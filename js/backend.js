'use strict';

/*
Функция получения данных с сервера должна принимать на вход:
- функцию обратного вызова onLoad
- функцию обратного вызова onError
*/
var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

var load = function (onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000; // 10s

  xhr.open('GET', LOAD_URL);
  xhr.send();
};


/*
Функция для отправки данных на сервер должна принимать на вход:
- data — объект FormData, который содержит данные формы, которые будут отправлены на сервер
- функцию обратного вызова onLoad
- функцию обратного вызова onError
*/

var upload = function (data, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000; // 10s

  xhr.open('POST', UPLOAD_URL)
  xhr.send();
};

var onError = function (error) {
}

var onLoad = function (data) {
};










window.backend = {
  // здесь будут экспортироваться данные в в глобальную область видимости
  load: load,
  upload: upload
}
