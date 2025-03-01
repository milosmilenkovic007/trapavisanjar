<?php
class Assets_Manager {
    public static function init() {
        add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue_assets']);
    }

    public static function enqueue_assets() {
        wp_enqueue_style('trapavisanjar-style', get_stylesheet_uri());
        wp_enqueue_script('trapavisanjar-js', get_template_directory_uri() . '/assets/js/main.js', [], false, true);
    }
}
?>
