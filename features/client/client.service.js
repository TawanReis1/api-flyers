const { Client } = require('./client.model');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
// const request = require('request');

class Service {
    getById(id) {
        return Client.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await Client.countDocuments(query);
        const data = await Client.find(query).limit(paging.limit).skip(paging.skip).sort(paging.sort).lean();

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(client) {
        return Client.create(client);
    }

    deleteOne(id) {
        return Client.delete({ _id: id });
    }

    updateOne(id, properties) {
        return Client.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
