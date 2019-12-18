import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { TextField, Grid, Container, Button, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';

const SignUP = (props) => {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorRetype, setErrorRetype] = useState(false);
    const [loading, setLoading] = useState(false)
    

    const axiosSignUp = async(e) =>{
        let updateHook = true
        if(
            username === '' ||
            name === ''  ||
            password === '' ||
             (password !== retypePassword)
        ) {
            alert('Please Input required fields accordingly..')
        } else {

            const signUpData = {
                name,
                username,
                password
            }
            
            try{

                if(updateHook){
                    setLoading(true);
                }
                
                const signUpAPI = await axios.post('http://127.0.0.1:4040/user/signup', signUpData, {});

                if(signUpAPI.data.msg === "Sign-up successful"){
                    alert('Sign Up Successful');
                    history.push('/');
                }else if(signUpAPI.data.msg=== "Username Already in use"){
                    alert('Username already in use');
                }

                if(updateHook){
                    setLoading(false);
                }
            } catch(err){
                alert('Signing Up server not reachable, please try again later');
            }
        
        }

        return(()=>{updateHook=false})
    }
    
  
    const onRetypePassword = (e)=>{
        setRetypePassword(e.target.value); 

        if(e.target.value !== password){
            setErrorRetype(true)
        }else{
            setErrorRetype(false) 
        }
        
    }

    if(loading){
        return(

            <Container>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >



            <Grid item xs={5}>
                <Container style={{ backgroundColor:'#fafafa', padding:'50px'}} >

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        >

                        <CircularProgress/>

                    </Grid>

                </Container>

            </Grid>   

        </Grid>
        </Container>
        )

    }

    return (
        <Container>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >



            <Grid item xs={5}>
                <Container style={{ backgroundColor:'#fafafa', padding:'50px'}} >

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        >

                        <Typography variant="h5" component="h3" style={{marginBottom:'15px'}}>
                           Sign-Up
                        </Typography>
                        
                         {/* NAME */}
                         <TextField
                            onChange={(e)=>{setName(e.target.value)}}
                            value={name}
                            error={false} label="Name" variant="outlined"  style={{width:'300px', marginBottom:'15px'}} />
                        
                        {/* USERNAME */}
                        <TextField 
                            onChange={(e)=>{setUsername(e.target.value)}}
                            value={username}
                            error={false} label="Username" variant="outlined"  style={{width:'300px', marginBottom:'15px'}} />
                        
                        {/* PASSWORD */}
                        <TextField 
                            onChange={(e)=>{setPassword(e.target.value)}}
                            value={password}
                            type="password" label="Password" variant="outlined"   style={{width:'300px', marginBottom:'15px'}} />

                        {/* Retype PASSWORD */}
                        <TextField 
                            onChange={onRetypePassword}
                            value={retypePassword}
                            error={errorRetype}
                            type="password" label="Retype Password" variant="outlined"   style={{width:'300px', marginBottom:'15px'}} />
                    
                        <Button onClick={()=>axiosSignUp()} variant="contained" color="primary" style={{textAlign:"center"}}>
                            Sign Up
                        </Button>
                
                            <Typography
                                onClick={()=>{history.push('/')}}
                                variant="caption" display="inline"  gutterBottom style={{marginTop:30, cursor:'pointer'}}>
                                Already have an account? Sign-in here
                            </Typography>
                    </Grid>

                </Container>

            </Grid>   

        </Grid>
        </Container>
    );
}

export default SignUP;