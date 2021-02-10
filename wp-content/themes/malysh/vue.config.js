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
        company: {
            entry: 'src/company/main.js',
            template: '/company.php',
            filename: 'company.php',
            title: 'Company',
        },
    }
}