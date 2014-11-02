_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

String.prototype.titleize = function() {
  var words = this.split(' ');
  var array = [];
  for (var i=0; i<words.length; ++i) {
    array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
  }
  return array.join(' ');
};

var shipTracker = (function() {
  var ships = [],
      infoTemplate,
      listItemTemplate,
      currentInfo;

  var _loadTemplates = function() {
    infoTemplate =  _.template($('#info-template').html());
    listItemTemplate =  _.template($('#list-item-template').html());
  };

  var _renderMarker = function(ship) {
    var baseIcon = {
        path: fontawesome.markers.LOCATION_ARROW,
        fillColor: "#B62921",
        fillOpacity: 0.9,
        scale: 0.3,
        strokeColor: "white",
        strokeWeight: 1,
        rotation: parseFloat(ship.heading) - 45,

    };

    var latLng = new google.maps.LatLng(parseFloat(ship.latitude),parseFloat(ship.longitude));

    ship.marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: ship.name.titleize(),
      icon: baseIcon
    });

    ship.marker.infoWindow = new google.maps.InfoWindow({
        content: infoTemplate({ 'ship': ship }),
        disableAutoPan: true
    });

    google.maps.event.addListener(ship.marker, 'click', function() {
      _activeShip(ship);
    });

    $(ship.listItem).on('click', function() {
      _activeShip(ship);
    });
  };

  var _activeShip = function(ship) {
    if (currentInfo) {
      currentInfo.close();
    }
    currentInfo = ship.marker.infoWindow;

    map.panTo(ship.marker.position);
    ship.listItem.siblings().removeClass('active');
    ship.listItem.addClass('active');
    ship.marker.infoWindow.open(map, ship.marker);
  };

  var _renderListItem = function(ship) {
    var item = listItemTemplate({'ship': ship});
    $('.ships').append(item);
    ship.listItem = $('[data-id=' + ship.id + ']');
  };

  var _renderShip = function(ship) {
    _renderListItem(ship);
    _renderMarker(ship);
  };

  var initialize = function(shipsJson) {
    _loadTemplates();
    ships = shipsJson;
    ships.forEach(function(ship) {
      if (ship.photos) {
        ship.phototag = '<img src="' + ship.photos + '" class="ship-thumb" />';
      } else {
        ship.phototag = '';
      }
      _renderShip(ship);
    });
  };

  var imoSearch = function(imonumber) {
    $.getJSON('/ships/search/?imonumber=' + imonumber, function(response){
      console.log(response);
    });
  };

  var nameSearch = function(name) {
    $.getJSON('/ships/search/?name=' + name, function(response){
      console.log(response);
    });
  };

  return {
    initialize: initialize,
    imoSearch: imoSearch,
    nameSearch: nameSearch
  };
})();

window.onload = function(){
  shipTracker.initialize(shipsJson);
};