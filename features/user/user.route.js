const Router = require('koa-router');
const controller = require('./user.controller');
const guard = require('../../shared/middlewares/flyers-middleware');

const routes = new Router();

routes.prefix(`/api/${process.env.BASE_API}/user`);

routes.get('/:id', guard.Authorize, controller.getById);
routes.post('/', guard.Authorize, controller.create);

module.exports = routes;