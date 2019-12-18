const router = require('express').Router();
const mongoose = require('mongoose');
const examinationSchema = require('../../schema/examination');
const examination = mongoose.model('Examination', examinationSchema);

router.get('/examinations/:user_Id', async(req, res)=>{
   
    let findParameter = {
        user_id : req.params.user_Id
    }
    
    let allExamination = await examination.find(findParameter);


    res.json({msg:'okay', data:allExamination})

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
})

// create examination id
router.post('/examination/insert', async(req,res)=>{

    const token = req.headers.authorization

    const  jwt = require('jsonwebtoken');
    const secretKey = require('./../../config/privatekey');

     jwt.verify( token,'1234', async(err, decoded) => {
        if(decoded) {
 
            var ExaminationData = new examination({ 
                user_id:decoded._id
            });

            let insertStatus = await ExaminationData.save();

            res.json({msg:'authorized' ,examination_id:insertStatus} );
            
        } else {
            res.sendStatus(401);
        }
    })
    
    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});


module.exports = router