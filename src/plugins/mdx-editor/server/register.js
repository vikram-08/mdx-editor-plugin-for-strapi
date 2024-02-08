'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "mdx-editor",
    plugin: "mdx-editor",
    type: "string",
    inputSize: {
      // optional
      default: 12,
      isResizable: false,
    },
  });
};
