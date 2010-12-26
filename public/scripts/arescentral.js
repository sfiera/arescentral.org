// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

AresCentral = (function() {

    var exports = {};

    var api_key = '534dd262e26312520e35180dc60e533b';

    var photoLinkUrl = function(photo, properties) {
        var pool = properties['pool'] || null;
        var suffix = '';
        if (pool) {
            suffix = '/in/pool-' + pool;
        }
        return 'http://www.flickr.com/photos/' + photo.ownername + '/' + photo.id + suffix + '/';
    };

    var photoImageUrl = function(photo, properties) {
        var photo_suffix = '';
        var size = properties['size'] || 'medium';
        if (size !== undefined) {
            photo_suffix = {
                'medium': '',
                'thumbnail': '_t',
            }[size];
        }
        return 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id +
            '_' + photo.secret + photo_suffix + '.jpg';
    };

    exports.loadScreenshots = function(element_id, group_id) {
        new Request.JSONP({
            'url': 'http://api.flickr.com/services/rest/',
            'data': {
                'method': 'flickr.groups.pools.getPhotos',
                'api_key': api_key,
                'format': 'json',
                'group_id': group_id,
            },
            'callbackKey': 'jsoncallback',
            'onSuccess': function(data) {
                var target = $(element_id);
                data.photos.photo.each(function(photo) {
                    var href = photoLinkUrl(photo, {'pool': group_id});
                    var src = photoImageUrl(photo, {'size': 'thumbnail'});
                    var img = new Element('img', {'src': src, 'title': photo.title});
                    var link = new Element('a', {'href': href});
                    link.grab(img);
                    target.grab(link);
                });
            },
        }).send();
    };

    return exports;

})();
