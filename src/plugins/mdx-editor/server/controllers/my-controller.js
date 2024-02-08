'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('mdx-editor')
      .service('myService')
      .getWelcomeMessage();
  },
});
