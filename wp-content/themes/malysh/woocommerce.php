<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package malysh
 */

get_header();
?>

    <div id="app"></div>

<?php/* woocommerce_content(); */?>
<? if ( is_shop() ) : ?>
    <script src="/wp-content/themes/malysh/dist/js/shop.js"></script>
<? endif; ?>

<?php
get_footer();
