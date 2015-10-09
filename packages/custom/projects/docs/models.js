exports.models = {

  Project: {
    id: 'Project',
    required: ['content', 'title'],
    properties: {

      title: {
        type: 'string',
        description: 'Title of the project'
      },
      content: {
        type: 'string',
        description: 'content of the project'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the project'
      }
    }
  }
};
