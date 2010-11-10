// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

var articles = require('./news').articles

exports.register = function(app, site) {
    app.get('/', function(req, res) {
        var article_list = Object.keys(articles).map(function(key) {
            return articles[key]
        })
        res.render('index.jade', {
            locals: {
                req: req,
                site: site,
                page: {
                    title: 'News',
                    alternate: '/news.atom',
                    articles: article_list,
                },
            },
        })
    })

    app.get('/news.atom', function(req, res) {
        var article_list = Object.keys(articles).map(function(key) {
            return articles[key]
        })
        res.render('atom.jade', {
            layout: false,
            locals: {
                req: req,
                site: site,
                page: {
                    title: 'News',
                    alternate: '/',
                    directory: '/news/',
                    entries: article_list,
                },
            },
        })
    })

    app.get('/news/:article', function(req, res, next) {
        var article = articles[req.params.article]
        if (article === undefined) {
            next()
            return
        }
        res.render('article.jade', {
            locals: {
                req: req,
                site: site,
                page: {
                    title: article.title,
                    alternate: '/news.atom',
                    article: article,
                },
            },
        })
    })
}
