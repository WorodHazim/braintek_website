'use strict';
module.exports = {
  admin: {
    type: 'admin',
    prefix: '/braintek-ops',
    routes: [
      { method: 'GET', path: '/summary', handler: 'dashboard.summary', config: { auth: { scope: ['plugin::braintek-ops.overview.access'] } } },
      { method: 'GET', path: '/submissions', handler: 'dashboard.submissions', config: { auth: { scope: ['plugin::braintek-ops.overview.access'] } } },
      { method: 'GET', path: '/submissions/:documentId', handler: 'dashboard.submission', config: { auth: { scope: ['plugin::braintek-ops.overview.access'] } } },
      { method: 'PATCH', path: '/submissions/:documentId', handler: 'dashboard.updateSubmission', config: { auth: { scope: ['plugin::braintek-ops.inquiries.update'] } } }
    ]
  }
};
