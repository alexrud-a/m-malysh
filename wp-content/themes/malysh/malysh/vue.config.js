module.exports = {
    filenameHashing: false,
    pages: {
        index: {
            entry: 'src/index/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Home',
        },
        company: {
            entry: 'src/company/main.js',
            template: 'public/company.html',
            filename: 'company.html',
            title: 'Company',
        },
    }
}