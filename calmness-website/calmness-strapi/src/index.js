'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Configure public permissions for our content types
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({
        where: {
          type: 'public',
        },
      });

    const contentTypes = [
      'api::page-accueil.page-accueil',
      'api::page-a-propos.page-a-propos', 
      'api::service.service',
      'api::page-contact.page-contact'
    ];

    for (const contentType of contentTypes) {
      await strapi
        .query('plugin::users-permissions.permission')
        .update({
          where: {
            role: publicRole.id,
            action: `${contentType}.find`,
          },
          data: { enabled: true },
        });

      await strapi
        .query('plugin::users-permissions.permission')
        .update({
          where: {
            role: publicRole.id,
            action: `${contentType}.findOne`,
          },
          data: { enabled: true },
        });
    }

    console.log('✅ Public permissions configured for all content types');
  },
};