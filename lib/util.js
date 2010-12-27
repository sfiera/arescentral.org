// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

exports.md5 = function(s) {
    return require('crypto').createHash('md5').update(s).digest('hex');
};

exports.gravatarUrl = function(email) {
    return require('url').format({
        protocol: 'http:',
        host: 'www.gravatar.com',
        pathname: '/avatar/' + exports.md5(email),
        query: { s: '48', d: 'mm' },
    });
};

exports.readMarkdownDirectory = function(directory, callback) {
    var fs = require('fs');
    var path = require('path');
    var markdown = require('markdown');

    var files = fs.readdirSync(directory);
    files.forEach(function(file) {
        var id = file.slice(0, file.length - path.extname(file).length);
        var content = fs.readFileSync(path.join(directory, file), 'utf-8');
        jsonml = markdown.toHTMLTree(content, 'Maruku');
        var data = {};
        if ((jsonml.length > 1) && (typeof jsonml[1] === "object")
                && !(jsonml[1] instanceof Array)) {
            data = jsonml[1];
        }
        data.id = id;
        data.html = markdown.renderJsonML(jsonml);
        callback(data);
    });
};

exports.maruku_markdown = function(str) {
    var markdown = require('markdown');
    str = str.replace(/\\n/g, '\n');
    var input = markdown.toHTMLTree(str, "Maruku")
    return markdown.renderJsonML(input).replace(/\n/g, '\\n').replace(/'/g,'&#39;');
}

