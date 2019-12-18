const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// parse application/json
app.use(bodyParser.json())

// connection
mongoose.connect( require('./config/key'), {useNewUrlParser: true, useUnifiedTopology: true});

// ****** ROUTES ******
app.use('/',require('./routes/users/users')); // USER RELATED API CLEANED
app.use('/', require('./routes/questions/question')); // QUESTIONAIRES RELATED API CLEANED

app.use('/', require('./routes/examination/examination')); // EXAMINATION 
app.use('/', require('./routes/answers/answers')) ; // ANSWERS

// app.use('/', require('./routes/testInfo/testInfo')); // TESTINFO REALTED API

const port  = 4040;
app.listen(port, ()=>{
    console.log('Server is Running @ PORT: ' + port )
})