const { Payment } = require('./payment.model');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
// const request = require('request');

class Service {
    getById(id) {
        return Payment.findOne({ _id: id });
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        const paging = pagingHelper.build(conditions);

        const total = await Payment.countDocuments(query);
        const data = await Payment.find(query).limit(paging.limit).skip(paging.skip).sort(paging.sort).lean();

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(client) {
        return Payment.create(client);
    }

    deleteOne(id) {
        return Payment.delete({ _id: id });
    }

    updateOne(id, properties) {
        return Payment.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
