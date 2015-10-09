'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Testplan = mongoose.model('Testplan'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Testplans) {

    return {
        /**
         * Find testplan by id
         */
        testplan: function(req, res, next, id) {
            Testplan.load(id, function(err, testplan) {
                if (err) return next(err);
                if (!testplan) return next(new Error('Failed to load testplan ' + id));
                req.testplan = testplan;
                next();
            });
        },
        /**
         * Create an testplan
         */
        create: function(req, res) {
            var testplan = new Testplan(req.body);
            testplan.user = req.user;

            testplan.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the testplan'
                    });
                }

                Testplans.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/testplans/' + testplan._id,
                    name: testplan.title
                });

                res.json(testplan);
            });
        },
        /**
         * Update an testplan
         */
        update: function(req, res) {
            var testplan = req.testplan;

            testplan = _.extend(testplan, req.body);


            testplan.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the testplan'
                    });
                }

                Testplans.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: testplan.title,
                    url: config.hostname + '/testplans/' + testplan._id
                });

                res.json(testplan);
            });
        },
        /**
         * Delete an testplan
         */
        destroy: function(req, res) {
            var testplan = req.testplan;


            testplan.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the testplan'
                    });
                }

                Testplans.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: testplan.title
                });

                res.json(testplan);
            });
        },
        /**
         * Show an testplan
         */
        show: function(req, res) {

            Testplans.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.testplan.title,
                url: config.hostname + '/testplans/' + req.testplan._id
            });

            res.json(req.testplan);
        },
        /**
         * List of Testplans
         */
        all: function(req, res) {
            var query = req.acl.query('Testplan');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, testplans) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the testplans'
                    });
                }

                res.json(testplans)
            });

        },
        /**
         * List of Project Testplans
         */
        byproject: function(req, res) {
            var query = req.acl.query('Testplan');

            query.find({

            }).sort('-created').populate('user', 'name username').exec(function(err, testplans) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the testplans'
                    });
                }

                res.json(testplans)
            });

        }
    };
}
