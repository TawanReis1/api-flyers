const flierRoutes = require('../features/flier/flier.route');
const clientRoutes = require('../features/client/client.route');
const userRoutes = require('../features/user/user.route');

class Routing {
  resolve(app) {
    app.use(flierRoutes.routes());
    app.use(clientRoutes.routes());
    app.use(userRoutes.routes());
  }
}

module.exports = new Routing();
