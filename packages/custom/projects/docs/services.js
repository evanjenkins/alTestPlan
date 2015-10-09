'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Project operations',
      path: '/projects',
      method: 'GET',
      summary: 'Get all Projects',
      notes: '',
      type: 'Project',
      nickname: 'getProjects',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/projects',
      method: 'POST',
      summary: 'Create project',
      notes: '',
      type: 'Project',
      nickname: 'createProject',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Project to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Project',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
