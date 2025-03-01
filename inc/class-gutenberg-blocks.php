<?php
class Gutenberg_Blocks {
    public static function init() {
        add_action('init', [__CLASS__, 'register_blocks']);
    }

    public static function register_blocks() {
        $block_paths = glob(get_template_directory() . '/blocks/*/block.json');

        if (!empty($block_paths)) {
            foreach ($block_paths as $block_json) {
                $block_dir = dirname($block_json);

                // Provera da li je blok već registrovan
                $block_name = json_decode(file_get_contents($block_json))->name ?? '';
                if (!empty($block_name) && WP_Block_Type_Registry::get_instance()->is_registered($block_name)) {
                    continue;
                }

                register_block_type_from_metadata($block_dir);
            }
        }
    }
}

Gutenberg_Blocks::init();

?>
