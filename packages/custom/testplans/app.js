'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Testplans = new Module('testplans');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Testplans.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Testplans.routes(app, auth, database);

  Testplans.aggregateAsset('css', 'articles.css');


  //We are adding a link to the main menu for all authenticated users
  Testplans.menus.add({
    'roles': ['authenticated'],
    'title': 'Testplans',
    'link': 'all testplans'
  });

  Testplans.events.defaultData({
    type: 'post',
    subtype: 'testplan'
  });


  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Articles.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Articles.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Articles.settings(function (err, settings) {
      //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);

  return Testplans;
});
