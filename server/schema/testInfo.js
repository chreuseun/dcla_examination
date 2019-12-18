var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testInfoSchema = new Schema({
    title : String, // title of the test,
    createdAt : { type: Date, default: Date.now }

})

module.exports = testInfoSchema;