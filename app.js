// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

var express = require('express')

require('jade').filters.markdown = require('./lib/util').maruku_markdown

var app = express.createServer()

// Configuration the app for both development and production environments.  The development
// environment will be used by default, which allows for stack traces and debugging information to
// be printed directly to the client in the browser.  Export NODE_ENV=production to disable this
// behavior and enable other caching mechanisms appropriate for production environments.
app.configure(function() {
    app.use(express.methodOverride())
    app.use(express.bodyDecoder())
    app.use(app.router)
    app.use(express.compiler({src: __dirname + '/public', enable: ['sass']}))
    app.use(express.staticProvider(__dirname + '/public'))
})

app.configure('development', function() {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}))
})

app.configure('production', function() {
    app.use(express.errorHandler())
})

var site = {
    title: 'Ares Central',
    host: 'arescentral.org',
    navigation: {
        'Home':     '/',
        'About':    '/about',
        'Xsera':    'http://xsera.org/',
        'Antares':  '/antares',
        'Forums':   'http://www.ambrosiasw.com/forums/index.php?showforum=88',
    },
}

require('./lib/index').register(app, site)
require('./lib/about').register(app, site)
require('./lib/antares').register(app, site)

app.listen(8124, '127.0.0.1')
console.log('Server running at http://127.0.0.1:8124/')
