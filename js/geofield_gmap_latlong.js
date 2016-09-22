(function ($) {
  var markerCoords = {};
  map = {};
  var mapMarker = {};
  var defaultCoords = {
    'lat' : 51.507,
    'lng' : -0.129
  };

  var initMap = function(coords) {
    if ($.isEmptyObject(coords)) {
      coords.lat = defaultCoords.lat;
      coords.lng = defaultCoords.lng;
    }

    return new google.maps.Map(document.getElementById('googlemaps_canvas'), {
      zoom: 9,
      center: new google.maps.LatLng(coords.lat, coords.lng),
      disableDoubleClickZoom: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  };

  var initMarker = function() {
    return new google.maps.Marker({
      position: new google.maps.LatLng(markerCoords.lat, markerCoords.lng),
      draggable: true
    });
  };

  var addGmapDragListener = function(marker, context) {
    google.maps.event.addListener(marker, 'dragend', function (evt) {
      markerCoords.lat = evt.latLng.lat().toFixed(3);
      markerCoords.lng = evt.latLng.lng().toFixed(3);

      // Update the field lat / lng from the new coords
      $(context).find('.field--type-geofield .geofield-lat').val(markerCoords.lat);
      $(context).find('.field--type-geofield .geofield-lon').val(markerCoords.lng);
    });
  };

  var addGmapDeleteListener = function(marker, context) {
    google.maps.event.addListener(marker, 'rightclick', function (evt) {
      mapMarker.setMap(null);
      mapMarker = '';

      // Update the field lat / lng from the new coords
      $(context).find('.field--type-geofield .geofield-lat').val('');
      $(context).find('.field--type-geofield .geofield-lon').val('');
    });
  };


  var initMarkerCoordsFromFieldValues = function(context) {
    if ($(context).find('.field--type-geofield .geofield-lat').val() &&
      $(context).find('.field--type-geofield .geofield-lon').val()) {

      markerCoords.lat = $(context).find('.field--type-geofield .geofield-lat').val();
      markerCoords.lng = $(context).find('.field--type-geofield .geofield-lon').val();
    }
  };

  var updateMarkerCoordsFromFieldValues = function(context) {
    // Update the field lat / lng from the new coords
    $('.field--type-geofield .geofield-lat, .field--type-geofield .geofield-lon').change(function() {
      if ($(context).find('.field--type-geofield .geofield-lat').val() &&
        $(context).find('.field--type-geofield .geofield-lon').val()) {

        markerCoords.lat = $(context).find('.field--type-geofield .geofield-lat').val();
        markerCoords.lng = $(context).find('.field--type-geofield .geofield-lon').val();

        if ($.isNumeric(markerCoords.lat) && $.isNumeric(markerCoords.lng)) {
          newLatLong = new google.maps.LatLng(markerCoords.lat, markerCoords.lng);
          mapMarker.setPosition(newLatLong);
          map.setCenter(mapMarker.position);
          mapMarker.setMap(map);
        }
        else {
          alert('Invalid value entered for lat / lng, please ensure the coordinate(s) are valid.');
        }
      }
    });
  };

  Drupal.behaviors.geofieldGmapLatlng = {
    attach: function (context, settings) {

      // Don't do anything if we're on field configuration
      if (!$(context).find("#edit-instance").length) {

        // Try initialize the coords from the field values
        initMarkerCoordsFromFieldValues(context);

        // Initialize the map, marker
        map = initMap(markerCoords);

        map.addListener('dblclick', function(e) {

          if (mapMarker.position === undefined) {

            markerCoords.lat = e.latLng.lat();
            markerCoords.lng = e.latLng.lng();

            mapMarker = initMarker(e.latlng);

            // Add the drag event listener
            addGmapDragListener(mapMarker, context);

            // Add the delete listener
            addGmapDeleteListener(mapMarker, context);

            // Setup the map, marker
            map.setCenter(mapMarker.position);
            mapMarker.setMap(map);

            // Set the initial lat / lng field value from the initial marker coords
            if ($(context).find('.field--type-geofield .geofield-lat').val() === '' &&
              $(context).find('.field--type-geofield .geofield-lon').val() === '') {
              $(context).find('.field--type-geofield .geofield-lat').val(markerCoords.lat);
              $(context).find('.field--type-geofield .geofield-lon').val(markerCoords.lng);
            }

            updateMarkerCoordsFromFieldValues(context);
          }

        });
      }
    }
  };

})(jQuery);

