<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package malysh
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/wp-content/themes/malysh/dist/css/header.css">
    <link rel="stylesheet" href="/wp-content/themes/malysh/dist/css/index.css">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<script>
    var siteInfo = {
        logo: '<?= wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' )[0]; ?>',
        name: '<?= bloginfo( 'name' );?>',
        desc: '<?= bloginfo('description');?>'
    }
</script>
<header id="header">

</header>
<script src="/wp-content/themes/malysh/dist/js/chunk-vendors.js"></script>
<script src="/wp-content/themes/malysh/dist/js/header.js"></script>
<script src="https://unpkg.com/vue-agile"></script>