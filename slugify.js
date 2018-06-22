'use strict';

const slugify = require('slugify');
const get = require('lodash').get
const set = require('lodash').set

module.exports = function (Model, options = {}) {
  const {
    slugifyOptions = {},
    slugifiedField = 'slug',
    fieldToSlugify,
  } = options;

  Model.observe('before save', function event(ctx, next) {

    if (typeof slugifiedField === 'string' && typeof fieldToSlugify === 'string') {

      const field = get(ctx.instance, fieldToSlugify);

      if (ctx.isNewInstance && field) {
        set(ctx.instance, slugifiedField, slugify(field, slugifyOptions));
      }
    }
    
    next();
  });
};
