const router = require('express').Router();
const mongoose = require('mongoose');
var testInfo = require('../../schema/testInfo');
var questionSchema = require('../../schema/question');

var TestInfo = mongoose.model('TestInfo', testInfo);
var Questions = mongoose.model('Question', questionSchema);

// Find All Test Info
router.get('/testinfo',(req,res)=>{

    TestInfo.find({}, function(err, arr) {

        if(err){
            res.sendStatus(401)
        }else {
            res.json({data: arr})
        }

    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});

// Find TestinFo by Criteria
router.get('/testinfo/:_id',(req,res)=>{

    TestInfo.find(req.params , function(err, arr) {

        if(err){
            res.send('NOT FOUND')
        }else {
            res.json({data: arr[0]})
        }

    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});

// Get Assigned questions to testInfos
router.get('/testinfo/:_id/questions',(req,res)=>{

    let queryCriteria = {
        testinfos_id : req.params._id
    }

    let returnData = `choices _id question points timer testinfos_id`
    
    Questions.find(queryCriteria, returnData, function(err, arr) {

        if(err){
            res.send('NOT FOUND')
        }else {
            res.json({
                    msg: `questions assigned to testInfos w/o answers`,
                    data: arr
            })
        }

    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});

// Get Assigned questions to testInfos
router.get('/testinfo/:_id/answers',(req,res)=>{

    let queryCriteria = {
        testinfos_id : req.params._id
    }

    
    Questions.find(queryCriteria,function(err, arr) {

        if(err){
            res.send('NOT FOUND')
        }else {
            res.json({
                    msg: `questions assigned to testInfos w/ Answer`,
                    data: arr
            })
        }

    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});

// Insert One TestInfo Document
router.post('/testinfo/insert', async(req,res)=>{
    // Data of User
    var addOneTestInfo = new TestInfo({ 
        title : 'Sample Quiz 1'
    });
    
    // Insert Query
    addOneTestInfo.save(function (err,data) {
      if (err){
        res.send('TestInfo Insert Failed')
        return handleError(err);
    
        }else{
            res.send('Insert TestInfo ' + data)
        }
    });

    // await MyModel.updateMany({}, { $set: { name: 'foo' } });


    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});





// Update TestinFo's Question Sets BY ObjectId
router.post('/testinfo/questions/update',(req,res)=>{

    let criteria = {
        _id:'5df56fdb124c68331c69f895'
    }

    let question_id = {
        question_id:[
            "5df571319e43593358081aa8",
            "5df571319e43593358081aa9",
            "5df571319e43593358081aaa",
            "5df571319e43593358081aab",
            "5df571319e43593358081aac",
            "5df571319e43593358081aad",
            "5df571319e43593358081aae",
            "5df571319e43593358081aaf",
            "5df571319e43593358081ab0",
            "5df571319e43593358081ab1"
        ] 
    }
    
    TestInfo.find(criteria, function(err, arr) {
        if(err){
            res.send('NOT FOUND')
        }else {
            // res.send(arr)


            

            TestInfo.findOneAndUpdate(criteria, question_id, {upsert: true}, function(err, doc) {
                if (err) return res.send(500, {error: err});

                return res.send('Succesfully saved.');
            });

        }
    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});

// Update TestinFo's Question Sets
router.get('/testinfo/questions',(req,res)=>{

    let criteria = {
        _id:'5df56fdb124c68331c69f895'
    }

    TestInfo.find(criteria, function(err, arr) {
        if(err){
            res.send('NOT FOUND')
        }else {

            const questionId = arr[0].question_id;

            
            
            TestInfo.find({
                '_id': { $in: [
                    mongoose.Types.ObjectId('5df571319e43593358081aa8'),
                    mongoose.Types.ObjectId('5df571319e43593358081aa9'), 
                    mongoose.Types.ObjectId('5df571319e43593358081aae')
                ]}
            }, function(err, docs){
                 console.log(docs);
            });

            res.send(arr[0].question_id)

            
        }
    }).limit(1);

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});


// await MyModel.updateMany({}, { $set: { name: 'foo' } });
module.exports = router





