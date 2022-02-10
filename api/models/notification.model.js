const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const notificationsSchema = mongoose.Schema({
    usuario: {type: Schema.Types.ObjectId, require: true, ref:"accounts"},
    color: {type: String, require: true},
    icon: { type: String, required: true },
    title: { type: String, required: true },
    routerLink: { type: String, required: true },
    visto: { type: Boolean, required: true },
    created: { type: Date, required: true },
    updated: { type: Date, required: true }
});

module.exports = mongoose.model('notifications', notificationsSchema);