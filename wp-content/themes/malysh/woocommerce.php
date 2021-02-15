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

<?php/* woocommerce_content(); */ ?>
<script>
    var breadcrumb = '<? woocommerce_breadcrumb() ?>';
</script>
<? if (is_shop()) : ?>
    <script src="/wp-content/themes/malysh/dist/js/shop.js"></script>
<? endif; ?>
<? if (is_product_category()) : ?>
    <? $category = get_queried_object(); ?>
    <script>
        var activeCategory = <? echo json_encode($category) ?>;
    </script>
    <script src="/wp-content/themes/malysh/dist/js/category.js"></script>
<? endif; ?>

<?php
get_footer();
