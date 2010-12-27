// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

title = "Antares"

screenshots = [
    {
        title:  'Ambassador Thrntz',
        src:    'http://farm3.static.flickr.com/2606/4103057024_0b577de0a2_t.jpg',
        href:   'http://www.flickr.com/photos/sfiera/4103057024/in/pool-1519223@N24/',
    },
    {
        title:  'Space Race, the Revival!',
        src:    'http://farm3.static.flickr.com/2742/4102298687_8c2e12276b_t.jpg',
        href:   'http://www.flickr.com/photos/sfiera/4102298687/in/pool-1519223@N24/',
    },
    {
        title:  'The Complete Idiot\'s Guide to Commanding a Space Armada',
        src:    'http://farm3.static.flickr.com/2597/4103065046_f52a39003f_t.jpg',
        href:   'http://www.flickr.com/photos/sfiera/4103065046/in/pool-1519223@N24/',
    },
];

exports.register = function(app, site) {
    app.get('/antares', function(req, res) {
        res.render('antares.jade', {
            locals: {
                req: req,
                site: site,
                page: {
                    title: title,
                    screenshots: screenshots,
                },
            },
        });
    });
};
