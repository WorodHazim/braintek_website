export default {
  routes: [
    {
      method: 'GET',
      path: '/news-feed',
      handler: 'news-item.feed',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
