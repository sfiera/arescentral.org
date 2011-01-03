// Copyright (c) 2010 Ares Central <http://arescentral.org/>
//
// This file is part of the Ares Central website, a free software project.  You can redistribute it
// and/or modify it under the terms of the MIT License.

var control = require('control');
var task = control.task;

var git = {
    push: function(repo, callback) {
        var spawn = require('child_process').spawn;
        var target = this.user + '@' + this.address + ':' + repo.path;
        var log = this.logger;
        log.puts('git push -- ' + target + ' ' + 'HEAD:' + repo.branch);
        subProcess = spawn('git', ['push', '--', target, 'HEAD:' + repo.branch]);
        subProcess.stdout.addListener('data', function(data) {
            log.puts(data.toString(), 'stdout: ');
        });
        subProcess.stderr.addListener('data', function(data) {
            log.puts(data.toString(), 'stderr: ');
        });
        subProcess.addListener('exit', function(code) {
            log.puts('exit: ' + code);
            if ((code === 0) && callback) {
                callback(this);
            }
        });
    },
};

task('production', 'Production server at http://arescentral.org/', function() {
    var config = {
        user: 'arescentral-deploy',
        job: 'www-arescentral',
        root: '/srv/www/arescentral.org/app',
        repo: {
            path: '/srv/git/arescentral.org',
            branch: 'master',
        },
        push: git.push,
    };
    return control.hosts(config, ['arescentral.org']);
});

task('staging', 'Staging server at http://staging.arescentral.org/', function() {
    var config = {
        user: 'arescentral-deploy',
        job: 'www-arescentral-staging',
        root: '/srv/www/staging.arescentral.org/app',
        repo: {
            path: '/srv/git/arescentral.org',
            branch: 'staging',
        },
        push: git.push,
    };
    return control.hosts(config, ['arescentral.org']);
});

task('deploy', 'Deploy to server', function(host) {
    host.push(host.repo, function() {
        var reset_args = '--git-dir=' + host.repo.path + ' --work-tree=' + host.root;
        host.ssh('git ' + reset_args + ' reset --hard ' + host.repo.branch, function() {
            host.ssh('sudo restart ' + host.job);
        });
    });
});

control.begin();
