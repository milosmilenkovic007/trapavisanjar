<?php
class Assets_Manager {
    public static function init() {
        add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue_assets']);
        add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue_block_assets']);
        add_action('enqueue_block_editor_assets', [__CLASS__, 'enqueue_block_editor_assets']);
    }

    public static function enqueue_assets() {
        $style_path = get_template_directory() . '/assets/css/theme.css';
        $script_path = get_template_directory() . '/assets/js/main.js';

        if (file_exists($style_path)) {
            wp_enqueue_style(
                'trapavisanjar-main-style',
                get_template_directory_uri() . '/assets/css/theme.css',
                array(),
                filemtime($style_path)
            );
        }

        if (file_exists($script_path)) {
            wp_enqueue_script(
                'trapavisanjar-js',
                get_template_directory_uri() . '/assets/js/main.js',
                array(),
                filemtime($script_path),
                true
            );
        }
    }

    public static function enqueue_block_assets() {
        if (!is_admin()) {
            $block_style_path = get_template_directory() . '/blocks/hero-banner/build/style.css';

            if (file_exists($block_style_path)) {
                wp_enqueue_style(
                    'trapavisanjar-hero-banner-style',
                    get_template_directory_uri() . '/blocks/hero-banner/build/style.css',
                    array(),
                    filemtime($block_style_path)
                );
            }
        }
    }

    public static function enqueue_block_editor_assets() {
        $editor_style_path = get_template_directory() . '/blocks/hero-banner/build/editor.css';
        $editor_script_path = get_template_directory() . '/blocks/hero-banner/build/index.js';

        if (file_exists($editor_style_path)) {
            wp_enqueue_style(
                'trapavisanjar-hero-banner-editor-style',
                get_template_directory_uri() . '/blocks/hero-banner/build/editor.css',
                array(),
                filemtime($editor_style_path)
            );
        }

        if (file_exists($editor_script_path)) {
            wp_enqueue_script(
                'trapavisanjar-hero-banner-editor-script',
                get_template_directory_uri() . '/blocks/hero-banner/build/index.js',
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n', 'wp-components', 'wp-data', 'wp-hooks'),
                filemtime($editor_script_path),
                true
            );
        }
    }
}

Assets_Manager::init();
