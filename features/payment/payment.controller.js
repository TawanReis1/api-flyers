const { onError, onSuccess, onCreated, onUpdated, onBadRequest, onNoContent } = require('../../shared/handlers');
const paymentService = require('./payment.service');
const { ObjectId } = require('mongodb');

class Controller {

    async list(ctx) {
        try {
            let res = await paymentService.find(ctx.query);

            return onSuccess(res.meta, res.data, ctx);
        } catch (e) {
            return onError('Error trying to list payments', e.toString(), ctx);
        }
    }

    async getById(ctx) {
        try {
            console.log('ctx.params.id :', ctx.params.id);
            const res = await paymentService.getById(ctx.params.id);

            return onSuccess({}, res, ctx);
        } catch (e) {
            return onError('Error trying to get payment by id', e.toString(), ctx);
        }
    }

    async create(ctx) {
        try {
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.address) return onBadRequest('Address cannot be null or empty', ctx);
            if (!ctx.request.body.telephone) return onBadRequest('Telephone cannot be null or empty', ctx);
            if (!ctx.request.body.email) return onBadRequest('Email cannot be null or empty', ctx);

            ctx.request.body.userId = new ObjectId(ctx.request.body.userId);

            const response = await paymentService.create(ctx.request.body);
            return onCreated(ctx, response);
        } catch (e) {
            throw onError('Error trying to create payment', e.toString(), ctx);
        }
    }

    async update(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);
            if (!ctx.request.body.name) return onBadRequest('Name cannot be null or empty', ctx);
            if (!ctx.request.body.address) return onBadRequest('Address cannot be null or empty', ctx);
            if (!ctx.request.body.telephone) return onBadRequest('Telephone cannot be null or empty', ctx);
            if (!ctx.request.body.email) return onBadRequest('Email cannot be null or empty', ctx);

            const response = await paymentService.updateOne(ctx.params.id, ctx.request.body);
            return onUpdated(ctx, response);
        } catch (e) {
            throw onError('Error trying to update payment', e.toString(), ctx);
        }
    }

    async delete(ctx) {
        try {
            if (!ctx.params.id) return onBadRequest('Id cannot be null or empty', ctx);

            await paymentService.deleteOne(ctx.params.id);
            return onNoContent(ctx);
        } catch (e) {
            throw onError('Error trying to delete payment', e.toString(), ctx);
        }
    }
}

module.exports = new Controller();