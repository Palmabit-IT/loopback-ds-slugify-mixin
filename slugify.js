'use strict';

const slugify = require('slugify');
const get = require('lodash').get
const set = require('lodash').set

module.exports = function (Model, options = {}) {
  const {
    slugifyOptions = {},
    slugifiedField = 'slug',
    fieldToSlugify,
    suffixTimestamp,
  } = options;

  Model.observe('before save', function event(ctx, next) {

    if (typeof slugifiedField === 'string' && typeof fieldToSlugify === 'string') {

      const field = get(ctx.instance, fieldToSlugify);

      if (ctx.isNewInstance && field) {
        let slug = slugify(field, slugifyOptions);
        if (suffixTimestamp) {
          const separator = slugifyOptions && slugifyOptions.replacement || '-'
          slug = `${slug}${separator}${new Date().getTime()}`
        }
        set(ctx.instance, slugifiedField, slug);
      }
    }

    next();
  });
};
