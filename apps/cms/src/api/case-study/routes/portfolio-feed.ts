export default {
  routes: [
    {
      method: 'GET',
      path: '/portfolio-feed',
      handler: 'case-study.portfolioFeed',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
