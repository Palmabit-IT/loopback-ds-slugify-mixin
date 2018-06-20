'use strict';

const slugify = require('slugify');

module.exports = function(Model, options = {}) {
  const {
    slugifyOptions = {},
    slugifiedField = 'slug',
    fieldToSlugify,
  } = options;

  Model.observe('before save', function event(ctx, next) {
    if (ctx.isNewInstance) {
      if (ctx.instance[fieldToSlugify]) {
        ctx.instance[slugifiedField] = slugify(ctx.instance[fieldToSlugify], slugifyOptions);
      }
    }
    next();
  });
};
