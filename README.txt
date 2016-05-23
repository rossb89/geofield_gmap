GEOFIELD_GMAP
--------------

Sub module for the Drupal 8 Geofield module  (http://drupal.org/project/geofield) to add a new widget to support adding lat/long field data using a google map.

INSTALL REQUIREMENTS  
--------------------

This module depends on the Geofield module to work.

INSTALL
--------------------

Install the module in the usual way.

CONFIGURE
--------------------

This module uses the Google Maps API to support adding the lat / long field data using a Google Map.

You will need to get a Google Maps API key before you can do this. 

For information on how to get a Google Maps API key, visit the Google Maps - Get API Key page - https://developers.google.com/maps/documentation/javascript/get-api-key.

Once you have your key, visit the configure page at /admin/config/system/geofield-gmap and add your API key there.

USAGE
--------------------

Once enabled, you should see a new field widget option "Latitude/Longitude (Gmap)" when choosing the field widget option for 
a geofield field.

Next time you add / edit a piece an entity using this field widget, you should see a Google Maps map and marker pin.

The only supported way at the moment to move the marker pin is to drag the marker pin to the desired location on the map.

If you also enter the lat / long field data into the field, the map should update the location of marker pin to reflect this change.
