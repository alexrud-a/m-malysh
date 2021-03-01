<?php
/**
 * malysh functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package malysh
 */

if (!defined('_S_VERSION')) {
    // Replace the version number of the theme on each release.
    define('_S_VERSION', '1.0.0');
}

if (!function_exists('malysh_setup')) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function malysh_setup()
    {
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on malysh, use a find and replace
         * to change 'malysh' to the name of your theme in all the template files.
         */
        load_theme_textdomain('malysh', get_template_directory() . '/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(
            array(
                'menu-1' => esc_html__('Primary', 'malysh'),
                'menu-2' => esc_html__('Footer', 'malysh'),
            )
        );

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
            )
        );

        // Set up the WordPress core custom background feature.
        add_theme_support(
            'custom-background',
            apply_filters(
                'malysh_custom_background_args',
                array(
                    'default-color' => 'ffffff',
                    'default-image' => '',
                )
            )
        );

        // Add theme support for selective refresh for widgets.
        add_theme_support('customize-selective-refresh-widgets');

        /**
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support(
            'custom-logo',
            array(
                'height' => 250,
                'width' => 250,
                'flex-width' => true,
                'flex-height' => true,
            )
        );
    }
endif;
add_action('after_setup_theme', 'malysh_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function malysh_content_width()
{
    $GLOBALS['content_width'] = apply_filters('malysh_content_width', 640);
}

add_action('after_setup_theme', 'malysh_content_width', 0);

/**
 * Enqueue scripts and styles.
 */
function malysh_scripts()
{
    wp_enqueue_style('malysh-style', get_stylesheet_uri(), array(), _S_VERSION);
    wp_style_add_data('malysh-style', 'rtl', 'replace');

    wp_enqueue_style('malysh-css', get_template_directory_uri() . '/dist/css/chunk-vendors.css', array(), _S_VERSION);
    wp_enqueue_style('malysh-css-app', get_template_directory_uri() . '/dist/css/app.css', array(), _S_VERSION);

    wp_enqueue_script('agile', 'https://unpkg.com/vue-agile', array(), _S_VERSION, true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('wp_enqueue_scripts', 'malysh_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/jetpack.php';
}

function change_posts_per_page($query)
{
    $query->set('posts_per_page', -1);
}

add_action('pre_get_posts', 'change_posts_per_page', 1);

add_action('wp_enqueue_scripts', function () {

    wp_deregister_style('woocommerce-general');
    wp_deregister_style('woocommerce-layout');

});

function wpplus_remove_jquery_migrate($scripts)
{
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, array('jquery-migrate'));
        }
    }
}

add_action('wp_default_scripts', 'wpplus_remove_jquery_migrate');

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
add_filter('tiny_mce_plugins', 'disable_wp_emojis_in_tinymce');
function disable_wp_emojis_in_tinymce($plugins)
{
    if (is_array($plugins)) {
        return array_diff($plugins, array('wpemoji'));
    } else {
        return array();
    }
}

add_filter('wp_mail_content_type', function ($content_type) {
    return "text/html";
});

add_filter('wp_mail_from_name', function ($from_name) {
    return 'info@m-malysh.ru'; // тут можно указать свою почту: asd@asd.ru
});

add_action('wp_ajax_form', 'form_function'); // wp_ajax_{ЗНАЧЕНИЕ ПАРАМЕТРА ACTION!!}
add_action('wp_ajax_nopriv_form', 'form_function');  // wp_ajax_nopriv_{ЗНАЧЕНИЕ ACTION!!}
// первый хук для авторизованных, второй для не авторизованных пользователей

function form_function()
{

    $data = json_decode(file_get_contents('php://input'), true);

    if (!empty($_POST['form']['name']) && !empty($_POST['form']['tel']) && !empty($_POST['form']['email'])) {
        $message = '';
        $to = 'alexrud-a@yandex.ru';//get_option('admin_email');
        $headers = "Content-type: text/html; charset=utf-8";
        $headers .= "From: no-reply@mail.ru";
        $subject = "Сообщение с сайта " . $_SERVER['SERVER_NAME'];
        $message .= "Имя: " . $_POST['form']['name'];
        $message .= "<br/>E-mail: " . $_POST['form']['email'];
        $message .= "<br/>Телефон:<br/>" . $_POST['form']['tel'];

        if (wp_mail($to, $subject, $message, $headers)) {
            $rtr = 'Cпасибо! Ваше сообщение отправлено!';
        } else {
            $rtr = 'Возникла ошибка, попруйте отправить сообщение позже';
        }
    } else {
        $rtr = 'Все поля обязательны к заполнению!';
    }

    //die не нужен
    wp_send_json($rtr);
}

add_action('wp_ajax_formRefund', 'formRefund_function'); // wp_ajax_{ЗНАЧЕНИЕ ПАРАМЕТРА ACTION!!}
add_action('wp_ajax_nopriv_formRefund', 'formRefund_function');  // wp_ajax_nopriv_{ЗНАЧЕНИЕ ACTION!!}
// первый хук для авторизованных, второй для не авторизованных пользователей

function formRefund_function()
{

    $data = json_decode(file_get_contents('php://input'), true);

    if (!empty($_POST['form']['name']) && !empty($_POST['form']['tel']) && !empty($_POST['form']['email'])) {
        $message = '';
        $to = 'alexrud-a@yandex.ru';//get_option('admin_email');
        $headers = "Content-type: text/html; charset=utf-8";
        $headers .= "From: no-reply@mail.ru";
        $subject = "Сообщение с сайта " . $_SERVER['SERVER_NAME'];
        $message .= "Имя: " . $_POST['form']['name'];
        $message .= "<br/>E-mail: " . $_POST['form']['email'];
        $message .= "<br/>Телефон:<br/>" . $_POST['form']['tel'];

        if (wp_mail($to, $subject, $message, $headers)) {
            $rtr = 'Cпасибо! Ваше сообщение отправлено!';
        } else {
            $rtr = 'Возникла ошибка, попруйте отправить сообщение позже';
        }
    } else {
        $rtr = 'Все поля обязательны к заполнению!';
    }

    //die не нужен
    wp_send_json($rtr);
}

add_action('wp_ajax_delivery', 'delivery_function'); // wp_ajax_{ЗНАЧЕНИЕ ПАРАМЕТРА ACTION!!}
add_action('wp_ajax_nopriv_delivery', 'delivery_function');  // wp_ajax_nopriv_{ЗНАЧЕНИЕ ACTION!!}

function delivery_function()
{
    $data = json_decode(file_get_contents('php://input'), true);

    //Авторизация СДЕК

    $cdek_auth = [
        'grant_type' => 'client_credentials',
        'client_id' => '2wMhSqJgMlqM9VstQHTVHPpCPPQrQhjE',
        'client_secret' => 'bLnCdu3F31n5ymVa8EGecZwT6WaopWir'
    ];

    $path = 'https://api.cdek.ru/v2/oauth/token?grant_type='. $cdek_auth['grant_type'] .'&client_id='. $cdek_auth['client_id'] .'&client_secret='. $cdek_auth['client_secret'];

    $myCurl = curl_init();
    curl_setopt_array($myCurl, array(
        CURLOPT_URL => $path,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query(array('Content-Type: application/x-www-form-urlencoded'))
    ));

    $response = curl_exec($myCurl);
    curl_close($myCurl);

    $token = json_decode($response, true)['access_token'];

    ////////////////////////////////////////////////////////////

    //Расчет доставки СДЕК
    $path = 'https://api.cdek.ru/v2/calculator/tariff';

    $data_to_cdek = [
        "from_location" => [
            "code" => "337"
        ],
        "to_location" => [
            "code" => $_POST['data']['to_cdek']
        ],
        'tariff_code' => '136',
        "packages" => [
            "height" => 30,
            "length" => 30,
            "weight" => $_POST['data']['weight'],
            "width" => 50
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json;charset=UTF-8", "Authorization: Bearer " . $token));
    curl_setopt($ch, CURLOPT_URL, $path);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data_to_cdek));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $path_post = 'https://tariff.pochta.ru/v2/calculate/tariff?json&object=3020&from=' . $_POST['data']['from'] . '&to=' . $_POST['data']['to'] . '&weight=' . $_POST['data']['weight'] . '&isavia=0&closed=1&sumoc=' . $_POST['data']['sumoc'] . '&date=' . date('Ymd');

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $path_post);
    //curl_setopt($ch2, CURLOPT_POSTFIELDS, http_build_query(array('Content-Type: application/x-www-form-urlencoded')));
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    $response2 = curl_exec($ch2);
    curl_close($ch2);

    $result = [
        'cdek' => json_decode($response),
        'russianPost' => json_decode($response2),
    ];

    wp_send_json($result);
}