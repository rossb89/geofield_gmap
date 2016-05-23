(function ($) {
  var markerCoords = {};
  var map = {};
  var mapMarker = {};
  var defaultCoords = {
    'lat' : 51.507,
    'long' : -0.129
  };

  var initMap = function(coords) {
    if ($.isEmptyObject(coords)) {
      coords.lat = defaultCoords.lat;
      coords.long = defaultCoords.long;
    }

    return new google.maps.Map(document.getElementById('googlemaps_canvas'), {
      zoom: 9,
      center: new google.maps.LatLng(coords.lat, coords.long),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  };

  var initMarker = function(coords) {
    if ($.isEmptyObject(coords)) {
      markerCoords.lat = defaultCoords.lat;
      markerCoords.long = defaultCoords.long;
    }

    return new google.maps.Marker({
      position: new google.maps.LatLng(markerCoords.lat, markerCoords.long),
      draggable: true
    });
  };

  var addGmapDragListener = function(marker, context) {
    google.maps.event.addListener(marker, 'dragend', function (evt) {
      markerCoords.lat = evt.latLng.lat().toFixed(3);
      markerCoords.long = evt.latLng.lng().toFixed(3);

      // Update the field lat / long from the new coords
      $(context).find('.field--type-geofield .geofield-lat').val(markerCoords.lat);
      $(context).find('.field--type-geofield .geofield-lon').val(markerCoords.long);
    });
  };

  var initMarkerCoordsFromFieldValues = function(context) {
    if ($(context).find('.field--type-geofield .geofield-lat').val() &&
      $(context).find('.field--type-geofield .geofield-lon').val()) {

      markerCoords.lat = $(context).find('.field--type-geofield .geofield-lat').val();
      markerCoords.long = $(context).find('.field--type-geofield .geofield-lon').val();
    }
  };

  var updateMarkerCoordsFromFieldValues = function(context) {
    // Update the field lat / long from the new coords
    $('.field--type-geofield .geofield-lat, .field--type-geofield .geofield-lon').change(function() {
      if ($(context).find('.field--type-geofield .geofield-lat').val() &&
        $(context).find('.field--type-geofield .geofield-lon').val()) {

        markerCoords.lat = $(context).find('.field--type-geofield .geofield-lat').val();
        markerCoords.long = $(context).find('.field--type-geofield .geofield-lon').val();

        if ($.isNumeric(markerCoords.lat) && $.isNumeric(markerCoords.long)) {
          newLatLong = new google.maps.LatLng(markerCoords.lat, markerCoords.long);
          mapMarker.setPosition(newLatLong);
          map.setCenter(mapMarker.position);
          mapMarker.setMap(map);
        }
        else {
          alert('Invalid value entered for lat / long, please ensure the coordinate(s) are valid.');
        }
      }
    });
  };

  Drupal.behaviors.geofieldGmapLatlong = {
    attach: function (context, settings) {

      // Don't do anything if we're on field configuration
      if (!$(context).find("#edit-instance").length) {

        // Try initialize the coords from the field values
        initMarkerCoordsFromFieldValues(context);

        // Initialize the map, marker
        map = initMap(markerCoords);
        mapMarker = initMarker(markerCoords);

        // Add the drag event listener
        addGmapDragListener(mapMarker, context);

        // Setup the map, marker
        map.setCenter(mapMarker.position);
        mapMarker.setMap(map);

        // Set the initial lat / long field value from the initial marker coords
        if ($(context).find('.field--type-geofield .geofield-lat').val() === '' &&
            $(context).find('.field--type-geofield .geofield-lon').val() === '') {
          $(context).find('.field--type-geofield .geofield-lat').val(markerCoords.lat);
          $(context).find('.field--type-geofield .geofield-lon').val(markerCoords.long);
        }

        updateMarkerCoordsFromFieldValues(context);
      }
    }
  };

})(jQuery);

