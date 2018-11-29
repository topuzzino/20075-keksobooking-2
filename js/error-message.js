'use strict';

// Block for creating the element with error message
(function () {
  window.createErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    var nodeClose = document.createElement('button');
    node.classList.add('error-block');
    node.textContent = errorMessage;
    nodeClose.classList.add('error-block__close');
    nodeClose.type = 'button';
    node.appendChild(nodeClose);

    document.body.insertAdjacentElement('afterbegin', node);
    nodeClose.focus();

    var closeErrorBlock = function () {
      node.remove();
      document.removeEventListener('keydown', errorBlockEscPressHandler);
    };

    var errorBlockEscPressHandler = function (evt) {
      window.utils.isEscKeycode(evt, closeErrorBlock);
    };

    document.addEventListener('keydown', errorBlockEscPressHandler);

    nodeClose.addEventListener('click', function (evt) {
      closeErrorBlock();
    });
    nodeClose.addEventListener('keydown', function (evt) {
      window.utils.isEnterKeycode(evt, closeErrorBlock);
    });
  };
})();
