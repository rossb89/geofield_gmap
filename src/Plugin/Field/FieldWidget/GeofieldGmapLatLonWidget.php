<?php

/**
 * @file
 * Contains \Drupal\geofield_gmap\Plugin\Field\FieldWidget\GeofieldGmapLatLonWidget.
 */

namespace Drupal\geofield_gmap\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'geofield_gmap_latlon' widget.
 *
 * @FieldWidget(
 *   id = "geofield_gmap_latlon",
 *   label = @Translation("Latitude/Longitude (Gmap)"),
 *   field_types = {
 *     "geofield"
 *   }
 * )
 */
class GeofieldGmapLatLonWidget extends WidgetBase {

  /**
   * Lat Lon widget components.
   *
   * @var array
   */
  public $components = array('lon', 'lat');

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $latlon_value = array();

    foreach ($this->components as $component) {
      $latlon_value[$component] = isset($items[$delta]->{$component}) ? floatval($items[$delta]->{$component}) : '';
    }

    $element += array(
      '#type' => 'geofield_gmap_latlon',
      '#default_value' => $latlon_value,
      '#error_label' => !empty($element['#title']) ? $element['#title'] : $this->fieldDefinition->getLabel(),
    );

    return array('value' => $element);
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    foreach ($values as $delta => $value) {
      foreach ($this->components as $component) {
        if (empty($value['value'][$component]) && !is_numeric($value['value'][$component])) {
          $values[$delta]['value'] = '';
          continue 2;
        }
      }
      $components = $value['value'];
      $values[$delta]['value'] = \Drupal::service('geofield.wkt_generator')->WktBuildPoint(array($components['lon'], $components['lat']));
    }

    return $values;
  }

}
