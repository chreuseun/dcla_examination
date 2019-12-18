var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  username: String,
  password: String
});

module.exports = userSchema;