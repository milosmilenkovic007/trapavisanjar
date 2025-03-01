<?php
class Theme_Setup {
    public static function init() {
        add_action('after_setup_theme', [__CLASS__, 'setup_theme']);
    }

    public static function setup_theme() {
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support('align-wide');
        add_theme_support('editor-styles');
        add_editor_style('assets/css/editor-style.css');
    }
}
?>
