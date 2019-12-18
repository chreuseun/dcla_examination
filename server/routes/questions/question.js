const router = require('express').Router();
const mongoose = require('mongoose');
var questionSchema = require('../../schema/question');
var Questions = mongoose.model('Question', questionSchema);

// Router Find Users
router.get('/question', async(req,res)=>{

    Questions.find({},  function(err, results) {

        if(err){
            res.send('NOT FOUND')
        }else {

            res.send(results)
        }
    }).sort({points:1});

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});


// Inser Bulk or Single Questions - DONT USE THIS END POINT
// router.post('/question/insert', async(req,res)=>{

//     var arrQuestions =  require('./../../dummyArray'); 

//     Questions.insertMany(arrQuestions,function (err,data) {
//         if (err){
//             res.send(err)
//         }else{
//             res.send(data)
//         }
//     });

//     console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
// });



module.exports = router