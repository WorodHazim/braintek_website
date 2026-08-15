'use strict';
module.exports = ({ strapi }) => {
  const actions = [
    { section: 'plugins', displayName: 'Access BRAINTEK Operations', uid: 'overview.access', pluginName: 'braintek-ops' },
    { section: 'plugins', displayName: 'Update BRAINTEK inquiries', uid: 'inquiries.update', pluginName: 'braintek-ops' }
  ];
  strapi.admin.services.permission.actionProvider.registerMany(actions);
};
