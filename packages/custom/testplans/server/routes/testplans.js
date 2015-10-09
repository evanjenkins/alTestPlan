'use strict';

// Testplan authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.testplan.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        };
    };

    next();
};

module.exports = function(Testplans, app, auth) {

  var testplans = require('../controllers/testplans')(Testplans);

  app.route('/api/testplans')
    .get(testplans.all)
    .post(auth.requiresLogin, hasPermissions, testplans.create);
  app.route('/api/project-testplans/:projectId')
    .get(testplans.byproject)
    .post(auth.requiresLogin, hasPermissions, testplans.create);
  app.route('/api/testplans/:testplanId')
    .get(auth.isMongoId, testplans.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, testplans.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, testplans.destroy);

  // Finish with setting up the testplanId param
  app.param('testplanId', testplans.testplan);
};
