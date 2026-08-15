import React from 'react';
import { permissions } from './permissions';

const Icon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 15V9h3v6H3Zm5 0V4h3v11H8Zm5 0V7h3v8h-3Z" fill="currentColor"/></svg>;

export default {
  register(app: any) {
    app.addMenuLink({
      to: 'plugins/braintek-ops',
      icon: Icon,
      intlLabel: { id: 'braintek-ops.plugin.name', defaultMessage: 'BRAINTEK Operations' },
      Component: () => import('./pages/App'),
      permissions: permissions.access,
      position: 2
    });
    app.registerPlugin({ id: 'braintek-ops', name: 'BRAINTEK Operations' });
  },
  bootstrap() {}
};
