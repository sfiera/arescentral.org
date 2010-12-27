// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

title = "About";

exports.register = function(app, site) {
    app.get('/about', function(req, res) {
        res.render('about.jade', {
            locals: {
                req: req,
                site: site,
                page: {
                    title: title,
                },
            },
        });
    });
};
