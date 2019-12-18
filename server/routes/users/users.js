const router = require('express').Router();
const mongoose = require('mongoose');
const userSchema = require('../../schema/user');
const User = mongoose.model('User', userSchema);



router.post('/user/insert', async(req,res)=>{

    // Data of User
    var addOneUser = new User({ 
        name: 'eunille' ,
        username:'euneun',
        password:'12345'
    });
    
    // Insert Query
    addOneUser.save(function (err,data) {
      if (err){
        res.send('ERR')
        return handleError(err);
    
    }else{
        res.send('Insert OK' + data)
    }
      // saved!
    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});

// Sign Up - WORKING API HASHING PASSWORD
router.post('/user/signup', async(req,res)=>{

    const {name, username, password} = req.body

    if(name && username && password){

        // hash the password DONE    
        var hash = require('../../config/bcrypt/createHash');
        let hashed = hash(req.body.password); // create HASH

        //Refactor the Object
        var SignUpData = new User({ 
            name,
            username,
            password : hashed
        });

        let ifExist;

        // check if USERNAME is existing - find()
        try{
            ifExist = await User.find({username}).limit(1);
        } catch(err){
            return(res.json({msg:'Signing up failed'}))
        }

        if(ifExist.length === 0) {
            try{
                let insertStatus = await SignUpData.save();
                res.json({msg:'Sign-up successful', data: insertStatus})
            } catch(err){
                return(res.json({msg:'Signing up failed'}))
            }
        } else {
            return(res.json({msg:'Username Already in use'}))
        }

    }else {
        res.sendStatus(401)
    }

    console.log('PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0])
});

// Login - WORKING API HASHING PASSWORD
router.post('/user/login', async(req,res) => {
    console.log('PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0])

    const {password, username} = req.body;

    if(password, username){
        let ifExist;

        // check if USERNAME is existing - find()
        try{
            ifExist = await User.find({username}).limit(1);

            const unhash = require('./../../config/bcrypt/unhash');

            const passwordOk = unhash(password, ifExist[0].password);
            
            let token;

            const payload = {
                username,
                _id:ifExist[0]._id
            }
            

            //signToken
            if(passwordOk){

                const  privateKey = require('./../../config/privatekey');
                const jwt = require('jsonwebtoken');

                token = jwt.sign(payload, '1234', { expiresIn: '24h' });
            }

            return res.json({msg:"Login successful", token});

        } catch(err){
            return(res.json({msg:'Logging-in failed'}))
        }

    }else{
        return(res.json({msg:'Logging-in failed'}))
    }

    
})

// Find All Users
router.get('/user/find',(req,res)=>{
    
    User.find({}, function(err, arr) {

        if(err){
            res.send('NOT FOUND')
        }else {
            res.send(arr)
        }

    });

    console.log( 'PATH: ' ,  req.route.path, 'METHOD:',  Object.keys(req.route.methods)[0] )
});


module.exports = router