export default {
  routes: [
    { method: 'GET', path: '/dashboard/summary', handler: 'admin-dashboard.summary', config: { auth: false, policies: [], middlewares: [] } },
    { method: 'GET', path: '/dashboard/submissions', handler: 'admin-dashboard.list', config: { auth: false, policies: [], middlewares: [] } },
    { method: 'GET', path: '/dashboard/submissions/:documentId', handler: 'admin-dashboard.one', config: { auth: false, policies: [], middlewares: [] } },
    { method: 'PATCH', path: '/dashboard/submissions/:documentId', handler: 'admin-dashboard.update', config: { auth: false, policies: [], middlewares: [] } },
    { method: 'POST', path: '/dashboard/submissions/:documentId/log', handler: 'admin-dashboard.log', config: { auth: false, policies: [], middlewares: [] } },
  ],
};
