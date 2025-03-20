'use strict';

module.exports = (plugin) => {
  const authControllerFactory = require('./controllers/auth');
  const authController = authControllerFactory({ strapi: plugin.strapi });
  plugin.controllers.auth.register = authController.register;
  plugin.routes['content-api'].routes.push(...require('./routes/auth').routes);
  return plugin;
};