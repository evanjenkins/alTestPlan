'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Testplan operations',
      path: '/testplans',
      method: 'GET',
      summary: 'Get all Testplans',
      notes: '',
      type: 'Testplan',
      nickname: 'getTestplans',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/testplans',
      method: 'POST',
      summary: 'Create testplan',
      notes: '',
      type: 'Testplan',
      nickname: 'createTestplan',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Testplan to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Testplan',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
