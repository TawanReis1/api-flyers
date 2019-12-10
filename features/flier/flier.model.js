const FlyersContext = require('../../shared/flyers-context');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, maxlength: 20 },    
    status: { type: String, default: 'IN_PROGRESS', enum: ["IN_PROGRESS", "PAUSED", "COMPLETED"] },
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    display: { type: String, required: true, unique: true, maxlength: 20 },    
    total: { type: String, required: true, unique: true, maxlength: 20 },
    withdraw: {
        date: {type: String, required: true},
        quantityFlier: {type: String, required: true},
        responsible: {type: String, required: true},
        observation: {type: String},
    },
    image: { data: Buffer, contentType: String }
},
    {
        versionKey: false,
        timestamps: true
    });

schema.plugin(mongooseDelete, { overrideMethods: true });

module.exports.FlierSchema = schema;
module.exports.Flier = FlyersContext.conn.model('Flier', schema);
