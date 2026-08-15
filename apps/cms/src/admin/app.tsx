import BraintekLogo from './extensions/braintek-logo.png';

export default {
  config: {
    auth: { logo: BraintekLogo },
    menu: { logo: BraintekLogo },
    head: { favicon: BraintekLogo },
    locales: ['en'],
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'BRAINTEK',
        'app.components.LeftMenu.navbrand.workplace': 'Digital Operations'
      }
    },
    tutorials: false,
    notifications: { releases: false }
  },
  bootstrap() {}
};
