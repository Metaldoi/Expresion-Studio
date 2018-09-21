var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    nombre:String,
    correo:String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('cuentas', Account);