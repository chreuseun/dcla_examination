var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String, // '1 + 1 = ?'
    choices: [ String ], // ["2","3","1","4"]
    answer: [ String ], // Map this to  the answer of the student
    timer: Number, // Seconds
    points: Number,
    testinfos_id : mongoose.Types.ObjectId
})

module.exports = questionSchema;