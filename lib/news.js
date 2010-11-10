// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

var util = require('./util')

var authors = {}
util.readMarkdownDirectory('authors', function(data) {
    data.avatar = util.gravatarUrl(data.email)
    authors[data.id] = data
})

exports.articles = {}
util.readMarkdownDirectory('articles', function(data) {
    data.date = new Date(data.date)
    data.author = authors[data.author]
    exports.articles[data.id] = data
})
