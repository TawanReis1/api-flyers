const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const flierService = require('./flier.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            console.log('ctx.query :', JSON.stringify(ctx.query, null, 4));

            let res = await flierService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            console.log('e :', e);
            return onError('Error trying to list fliers', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            const res = await flierService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get flier by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('name cannot be null or empty', ctx);
            if (!ctx.request.body.status) return onBadRequest('status date cannot be null or empty', ctx);
            if (!ctx.request.body.clientId) return onBadRequest('clientId cannot be null or empty', ctx);
            if (!ctx.request.body.display) return onBadRequest('display cannot be null or empty', ctx);
            if (!ctx.request.body.total) return onBadRequest('total cannot be null or empty', ctx);

            ctx.request.body.clientId = new ObjectId(ctx.request.body.clientId);

            const response = await flierService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            throw onError('Error trying to create flier', e.toString(), ctx);
        }
    }

    async update(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            const response = await flierService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update flier', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            await flierService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete flier', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();