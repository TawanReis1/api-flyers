const flierRoutes = require('../features/flier/flier.route');
const clientRoutes = require('../features/client/client.route');

class Routing {
  resolve(app) {
    app.use(flierRoutes.routes());
    app.use(clientRoutes.routes());
  }
}

module.exports = new Routing();
