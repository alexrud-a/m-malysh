module.exports = {
    filenameHashing: false,
    pages: {
        header: {
            entry: 'src/header/main.js',
            template: '/header.php',
            filename: 'header.php',
            title: 'Header',
        },
        footer: {
            entry: 'src/footer/main.js',
            template: '/footer.php',
            filename: 'footer.php',
            title: 'Footer',
        },
        index: {
            entry: 'src/index/main.js',
            template: '/index.php',
            filename: 'index.php',
            title: 'Home',
        },
        shop: {
            entry: 'src/shop/main.js',
            template: '/woocommerce.php',
            filename: 'woocommerce.php',
            title: 'Shop',
        },
        category: {
            entry: 'src/category/main.js',
            template: '/woocommerce.php',
            filename: 'woocommerce.php',
            title: 'Category',
        },
        product: {
            entry: 'src/product/main.js',
            template: '/woocommerce.php',
            filename: 'product.php',
            title: 'Shop',
        },
        company: {
            entry: 'src/company/main.js',
            template: '/company.php',
            filename: 'company.php',
            title: 'Company',
        },
        info: {
            entry: 'src/info/main.js',
            template: '/info.php',
            filename: 'info.php',
            title: 'Info',
        },
        support: {
            entry: 'src/support/main.js',
            template: '/support.php',
            filename: 'support.php',
            title: 'Support',
        },
        sales: {
            entry: 'src/sales/main.js',
            template: '/sales.php',
            filename: 'sales.php',
            title: 'Sales',
        },
    }
}