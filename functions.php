<?php

function trapavisanjar_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'trapavisanjar-hero-banner-editor-script',
        get_template_directory_uri() . '/blocks/hero-banner/build/index.js',
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n', 'wp-components', 'wp-data', 'wp-hooks' ],
        filemtime(get_template_directory() . '/blocks/hero-banner/build/index.js'),
        true
    );
}
add_action('enqueue_block_editor_assets', 'trapavisanjar_enqueue_block_editor_assets');


// Učitavanje osnovnih klasa
require_once get_template_directory() . '/inc/class-theme-setup.php';
require_once get_template_directory() . '/inc/class-assets.php';
require_once get_template_directory() . '/inc/class-gutenberg-blocks.php';

// Inicijalizacija teme
Theme_Setup::init();
Assets_Manager::init();

/**
 * Omogući REST API za SVE bez autentifikacije (ZA TESTIRANJE)
 */
add_filter('rest_authentication_errors', function ($result) {
    if (defined('REST_REQUEST') && REST_REQUEST) {
        return null; // Potpuno uklanja autentifikaciju za REST API
    }
    return $result;
});

/**
 * Omogući pristup /wp/v2/block-types SVIMA
 */
add_filter('rest_pre_dispatch', function ($response, $server, $request) {
    if (strpos($request->get_route(), '/wp/v2/block-types') !== false) {
        return $response; // Potpuno otključano
    }
    return $response;
}, 10, 3);

/**
 * Rešava 401 Unauthorized i proverava korisničke privilegije
 */
add_filter('user_has_cap', function ($allcaps, $caps, $args, $user) {
    if (!is_array($allcaps)) {
        $allcaps = array(); // Resetuj ako je problem sa podacima
    }

    if (is_admin() || defined('REST_REQUEST')) {
        $allcaps['edit_posts'] = true; // Dozvoli REST API svima
        $allcaps['unfiltered_html'] = true; // Omogući HTML uređivanje
    }

    return $allcaps;
}, 10, 4);

/**
 * Dodaj CORS podršku za REST API
 */
add_action('rest_api_init', function() {
    add_filter('rest_pre_serve_request', function($value) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Authorization, Content-Type");
        return $value;
    });
});
