const mongoose = require('mongoose')

var Agency = mongoose.model('Agency',
{
    nom: {type:String},
    address: {type:String},
    wilaya: {type:String},
    commune: {type:String},
    phone: {type:String},
    created_at: {type:String},
},'Agency')

module.exports = { Agency}