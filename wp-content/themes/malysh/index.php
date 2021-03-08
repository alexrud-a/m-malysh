<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package malysh
 */
?>
    <!doctype html>
<html <? language_attributes(); ?>>
    <head>
        <meta charset="<? bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <? wp_head(); ?>
    </head>

<body <? body_class(); ?>>
<? wp_body_open(); ?>

    <script>
        var siteInfo = {
            logo: '<?= wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full')[0]; ?>',
            logoMin: '<?= wp_get_attachment_image_src(get_theme_mod('custom_logo2'), 'full')[0]; ?>'
            name: '<?= bloginfo('name');?>',
            desc: '<?= bloginfo('description');?>'
        }
    </script>
    <div id="app"></div>

    <script src="/wp-content/themes/malysh/dist/js/chunk-vendors.js"></script>
    <script src="/wp-content/themes/malysh/dist/js/app.js"></script>

<? wp_footer(); ?>