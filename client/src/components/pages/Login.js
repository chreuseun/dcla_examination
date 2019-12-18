import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, Grid, Container, Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Login = (props) => {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    // const Authorization = async() => {
    // }

    useEffect(()=>{

        if(localStorage.getItem('token')){
            history.push('/main')
        }else{
            localStorage.clear()
        }
    }, [])

    // Login button is clicked
    const LoginPostRequest = async(e) => {
        if(username !== '' && password !== ''){
            // console.log(username , password);

            const loginData = {
                username,
                password
            }

            try{
                setLoader(true);
                const loginAPI = await axios.post('http://127.0.0.1:4040/user/login', loginData, {});
                setLoader(false);
                // console.log(loginAPI.data.token);

                if(!loginAPI.data.token ){
                    alert('Login Failed, Invalid Username/Password')
                } else{
                    localStorage.setItem('token', loginAPI.data.token);
                    history.push({
                            pathname:'/main',
                            state: { username }
                        })
                }
                
            }catch(err){
                
            }

        }
    }

    if(loader) {
        return(
        
            <ProgressBar/>
        )
    }

    return (
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
                           Quiz Application
                        </Typography>

                        {/* USERNAME */}
                        <TextField
                            onChange={(e)=>{setUsername(e.target.value)}}
                            value={username}
                            /*helperText="Incorrect entry."*/  
                            error={false} label="Username" variant="outlined"  style={{width:'300px', marginBottom:'15px'}} />

                        {/* PASSWORD */}
                        <TextField 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        value={password}
                        type="password" label="Password" variant="outlined"   style={{width:'300px', marginBottom:'15px'}} />
                    
                        <Button
                            onClick={LoginPostRequest}
                            variant="contained" color="primary" style={{textAlign:"center"}}>
                            Login
                        </Button>
                
                            <Typography onClick={()=>{history.push('/signup')}} variant="caption" display="inline"  gutterBottom style={{marginTop:30, cursor:'pointer'}}>
                                Don't have an account? Sign-up here
                            </Typography>


                            <Typography onClick={()=>{history.push('/results')}} variant="caption" display="inline"  gutterBottom style={{marginTop:30, cursor:'pointer'}}>
                                See Quiz Results Click here 
                            </Typography>
                    </Grid>

                </Container>

            </Grid>   

        </Grid> 
    );
}

const ProgressBar = (props) => {


    const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
        marginLeft: theme.spacing(2),
        },
    },
    }));


    const classes = useStyles();

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <div className={classes.root}>
                <CircularProgress />
            </div>
        </Grid>
    )
   
}

export default Login;