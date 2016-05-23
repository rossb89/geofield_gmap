<?php

/**
 * @file
 * Contains \Drupal\geofield_gmap\Element\GeofieldGmapLatLon.
 */

namespace Drupal\geofield_gmap\Element;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element;
use Drupal\geofield\Element\GeofieldLatLon;

/**
 * Extends a GeofieldLatLon form element to provide a latlong form element
 * with additional gmap support.
 *
 * @FormElement("geofield_gmap_latlon")
 */
class GeofieldGmapLatLon extends GeofieldLatLon {

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    $class = get_class($this);
    $info = parent::getInfo();

    // Use the same getInfo() as GeofieldLatLon but swap out the #process
    $info['#process'] = [
      [$class, 'gmap_latlonProcess'],
    ];

    return $info;
  }

  /**
   * Generates the geofield_gmap Lat Lon form element.
   *
   * @param array $element
   *   An associative array containing the properties and children of the
   *   element. Note that $element must be taken by reference here, so processed
   *   child elements are taken over into $form_state.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   * @param array $complete_form
   *   The complete form structure.
   *
   * @return array
   *   The processed element.
   */
  public static function gmap_latlonProcess(&$element, FormStateInterface $form_state, &$complete_form) {
    static::elementProcess($element, $form_state, $complete_form);

    $element['#attached']['library'][] = 'geofield_gmap/gmap';
    $element['#attached']['library'][] = 'geofield_gmap/googlemaps';
    $element['gmap_laglong'] = array(
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => array('id' => 'googlemaps_canvas'),
      '#value' => 'Gmap',
    );

    return $element;
  }

}
