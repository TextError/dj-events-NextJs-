'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async me(ctx) {
    const { user } = ctx.state;

    if(!user) return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }]}]);
    const events = await strapi.services.events.find({ user: user.id });
    if(!events) return ctx.notFound();

    return sanitizeEntity(events, {model: strapi.models.events});

  }
};
