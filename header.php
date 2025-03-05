<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title('|', true, 'right'); ?></title>

    <?php wp_head(); ?> 
</head>
<body <?php body_class(); ?>>

<header class="header">
    <div class="header__logo">
        <a href="<?php echo home_url(); ?>">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/trapavisanjar.svg" alt="Logo">
        </a>
    </div>

    <nav class="header__nav">
        <?php
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_class'     => 'header-menu',
            'container'      => false
        ));
        ?>
    </nav>

    <div class="header__burger">
        <span></span>
        <span></span>
        <span></span>
    </div>
</header>
