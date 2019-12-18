var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    user_id : mongoose.Types.ObjectId, //
    examinations_id : mongoose.Types.ObjectId,//
    question_id : mongoose.Types.ObjectId,//
    answer : String,//
    score: Number //
})

module.exports = answerSchema;