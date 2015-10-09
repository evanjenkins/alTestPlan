exports.models = {

  Testplan: {
    id: 'Testplan',
    required: ['content', 'title'],
    properties: {

      title: {
        type: 'string',
        description: 'Title of the testplan'
      },
      content: {
        type: 'string',
        description: 'content of the testplan'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the testplan'
      }
    }
  }
};
