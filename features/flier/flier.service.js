const { Flier } = require('./flier.model');
const filterHelper = require('../../shared/helpers/filter');
const pagingHelper = require('../../shared/helpers/paging');
// const request = require('request');

class Service {
    getById(id) {
        return Flier.findOne({ _id: id }).populate(['clientId', 'client']);
    }

    async find(conditions) {
        const query = filterHelper.build(conditions);
        // const query = filterHelper.build2(conditions);
        const paging = pagingHelper.build(conditions);
        console.log('paging :', paging);

        const total = await Flier.countDocuments(query);
        const data = await Flier.find(query).limit(paging.limit).skip(paging.skip).sort(paging.sort).lean().populate(['clientId', 'client']);
        // const data = await Flier.aggregate([
        //     {$limit: 11},
        //     {$skip: 0},
        //     {$match: 
        //         {deleted: true}
        //     }
        // ])

        return {
            meta: pagingHelper.resolve(paging, total),
            data
        };
    }

    create(flier) {
        return Flier.create(flier);
    }

    deleteOne(id) {
        return Flier.delete({ _id: id });
    }

    updateOne(id, properties) {
        return Flier.updateOne({ _id: id }, properties)
    }
}

module.exports = new Service();
