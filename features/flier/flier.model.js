const FlyersContext = require('../../shared/flyers-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },    
    status: { type: String, default: 'IN_PROGRESS', enum: ["IN_PROGRESS", "PAUSED", "COMPLETED"] },
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    display: { type: String, required: true, maxlength: 20 },    
    total: { type: String, required: true, maxlength: 20 },
    withdraw: {
        date: {type: String},
        quantityFlier: {type: String},
        responsible: {type: String},
        observation: {type: String},
    },
    concludedAt: { type: String, maxlength: 20 },
    image: { data: Buffer, contentType: String }
},
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.FlierSchema = schema;
module.exports.Flier = FlyersContext.conn.model('Flier', schema);
