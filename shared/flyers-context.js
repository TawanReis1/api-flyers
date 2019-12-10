const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

const mongoConfig = {
    useNewUrlParser: true,
    autoReconnect: true
}

class FlyersContext {

    static get conn() {
        if (!FlyersContext.connection) {
            FlyersContext.connect()         
        }
        return FlyersContext.connection;
    }

    static connect() {
        const cs = process.env.MONGO_FLYERS;
        FlyersContext.connection = Mongoose.createConnection(cs, mongoConfig);
    }
}

module.exports = FlyersContext;
