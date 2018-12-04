'use strict';

// Block for working with filters
(function () {
  var ANY_VALUE = 'any';
  var price {
    LOW: 10000,
    HIGH: 50000
  };

  var filtersBlock = document.querySelector('.map__filters');
  var filterType = filtersBlock.querySelector('#housing-type');
  var filterPrice = filtersBlock.querySelector('#housing-price');
  var filterRooms = filtersBlock.querySelector('#housing-rooms');
  var filterGuests = filtersBlock.querySelector('#housing-guests');

  var filterFieldToKey = {
    'type': filterType,
    'rooms': filterRooms,
    'guests': filterGuests
  };

  var advertsData = [];
  var advertsFiltered = [];

  // Initial state of filters, state after reset
  var disableFilters = function () {
    Array.from(filtersBlock.elements).forEach(function (item) {
      item.disabled = true;
    });
    filtersBlock.removeEventListener('change', filtersChangeHandler);
  };

  disableFilters();

  // Activation filters by clicking
  var activateFilters = function () {
    Array.from(filtersBlock.elements).forEach(function (item) {
      item.disabled = false;
    });
    filtersBlock.addEventListener('change', filtersChangeHandler);
  };

  // Function for proving the match between filter value and ad field (for appartment type, number of rooms and guests)
  var filterByValue = function (field) {
    return function (item) {
      return item.offer[field].toString() === filterFieldToKey[field].value || filterFieldToKey[field].value === ANY_VALUE;
    };
  };

  // FUnction for proving the match between filter value and price ad field
  var checkPrice = function (item) {
    var priceLimits = {
      'middle': item.offer.price >= Price.LOW && item.offer.price <= Price.HIGH,
      'low': item.offer.price < Price.LOW,
      'high': item.offer.price > Price.HIGH
    };
    return priceLimits[filterPrice.value];
  };

  var filterByPrice = function (item) {
    return checkPrice(item) || filterPrice.value === ANY_VALUE;
  };

  // Function for proving the match between chosen features and features in ad
  var filterByFeatures = function (item) {
    var checkedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
    return checkedFeatures.every(function (checkedFeature) {
      return item.offer.features.includes(checkedFeature.value);
    });
  };

  var filtersChangeHandler = window.utils.debounce(function () {
    window.pin.removeMapPins();
    window.card.closeMapCard();
    advertsFiltered = advertsData.slice()
    .filter(filterByValue('type'))
    .filter(filterByValue('rooms'))
    .filter(filterByValue('guests'))
    .filter(filterByPrice)
    .filter(filterByFeatures);

    window.pin.renderMapPinsList(advertsFiltered);
  });

  // Copy data from server into advertsData
  var getAdvertsData = function (data) {
    advertsData = data.slice();
  };

  // FUnction for resetting filter
  var resetFilters = function () {
    disableFilters();
    filtersBlock.reset();
  };

  window.filters = {
    activateFilters: activateFilters,
    resetFilters: resetFilters,
    getAdvertsData: getAdvertsData
  };
})();
