var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examinationSchema = new Schema({
    user_id : mongoose.Types.ObjectId,
    createAt :  { type: Date, default: Date.now }
})

module.exports = examinationSchema;