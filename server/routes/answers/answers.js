const router = require('express').Router();
const mongoose = require('mongoose');
const answerSchema = require('../../schema/answers');
const Answer = mongoose.model('Answer', answerSchema);

const questionSchema =require('../../schema/question');
const Question = mongoose.model('Question', questionSchema);

// create examination id
router.post('/answer/insert', async(req,res)=>{


    const token = req.headers.authorization

    const  jwt = require('jsonwebtoken');
    const secretKey = require('./../../config/privatekey');

     jwt.verify( token,'1234', async(err, decoded) => {
        if(decoded) {
            
            let answerChecking = await Question.find({_id:req.body.question_id}, '_id answer question points').limit(1);

            let score = `${answerChecking[0].answer[0]}` === `${req.body.answer}` ? answerChecking[0].points : 0
 
            let responseData = {
                user_id : decoded._id,
                correctAnswer: answerChecking[0].answer[0],
                question: answerChecking[0].question,
                examinations_id : req.body.examinationId,
                question_id : req.body.question_id,
                answer : req.body.answer,
                score
            }

            let dataAnswer = {
                user_id : decoded._id,
                examinations_id : req.body.examinationId,
                question_id : req.body.question_id,
                answer : req.body.answer,
                score
            }
            
            var answerData = new Answer(dataAnswer);


            let SaveAnswer = await answerData.save();
    

            res.json({msg:'authorized', insertStatus: SaveAnswer._id, result:responseData} );

            //
            
        } else {
            console.log('error') 
            res.sendStatus(401);
        }
    })

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});


router.get('/answer/:exam_id', async(req,res)=>{
    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )

    let body = {
        examinations_id : req.params.exam_id
    }

    let fetchAnswers = await Answer.find(body);

    res.json({msg:'route', data : fetchAnswers });
})


module.exports = router