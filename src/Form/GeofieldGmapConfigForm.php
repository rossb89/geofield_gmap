<?php

/**
 * @file
 * Contains \Drupal\geofield_gmap\Form\GeofieldGmapConfigForm.
 */

namespace Drupal\geofield_gmap\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Custom settings form for the geofield_gmap module
 */
class GeofieldGmapConfigForm extends ConfigFormBase {
  
  /**
   * Constructor for GeofieldGmapConfigForm.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   * The factory for configuration objects.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    parent::__construct($config_factory);
  }
  
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'geofield_gmap_admin_form';
  }
  
  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['geofield_gmap.settings'];
  }
  
  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('geofield_gmap.settings');

    $google_maps_url = Link::fromTextAndUrl($this->t('Google Maps - Get API Key page'), Url::fromUri('https://developers.google.com/maps/documentation/javascript/get-api-key'))->toRenderable();

    $form['geofield_gmap']['google_maps_api_key'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Google Maps API Key'),
    ];

    $form['geofield_gmap']['google_maps_api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API Key'),
      '#default_value' => $config->get('google_maps_api_key') ? $config->get('google_maps_api_key') : '',
      '#description' => $this->t('For information on how to get a Google Maps API key, visit the @google_maps_url.', ['@google_maps_url' => render($google_maps_url)]),
    ];

    return parent::buildForm($form, $form_state);
  }
  
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $this->configFactory()->getEditable('geofield_gmap.settings')
      ->set('google_maps_api_key', $form_state->getValue('google_maps_api_key'))
      ->save();
    
    parent::submitForm($form, $form_state);
  }
}
