import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { Menu, Button, Container, Grid, Form, Radio, Message, Loader, Header, Comment } from 'semantic-ui-react'
import axios from 'axios'

const Main = (props) => {

    const history = useHistory();

    const [question, setQuestion] = useState([]);
    const [start, setStart] = useState(false);
    const [activePage,setActivePage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answer , setAnswer] = useState('');
    const [results , setResults] = useState([]);
    const [examinationId, setExaminationId] = useState({});
    const [displayResults, setDisplayresults] = useState(false);

    useEffect(()=>{
        let cleanUp = true;

        if(!localStorage.getItem('token')){
            history.push('/')
        }

        try{
            let getQuestionAPI = async() => {

                setLoading(true)
                let questions = await axios.get(`http://127.0.0.1:4040/question`,{})

                // console.log(questions.data);

                if(cleanUp){
                    setQuestion(questions.data)
                    setLoading(false);
                }
            }

            getQuestionAPI()
        }catch(err){
            console.log('error');
        }

        return(()=>{cleanUp=false})
    
    },[])

    // CANCEL ANSWER SHEET
    const OnBack = () => {

        if(activePage > 0){
            setActivePage(prev => prev - 1);
        } else {
            setStart(false)
        }
        

    }

    // next question BUTTON
    const OnForward = async() => {


        if(activePage <= 9){
            const header = {
                headers: {
                    authorization : localStorage.getItem('token')
                }
            }
        
            let body = {
                // answer,
                question_id: question[activePage]._id,
                examinationId:examinationId.examination_id._id,
                answer
            }
                try{
                    setLoading(true)
                    let insertAnswer =  await axios.post('http://127.0.0.1:4040/answer/insert',body,header)
                    // console.log('Exam Attemp Sent')
                    setAnswer('');
                    setResults(  [...results, insertAnswer.data.result]   )
                    // setExaminationId(getExaminationId)
                    // console.log(insertAnswer.data); 
                    
                    setLoading(false)
            } catch(err){
                // console.log('Examination number denied')
            }


            if(activePage === 9){
                setDisplayresults(true)
            } else {
                setActivePage(prev => prev + 1);
            }
            
        }else{
            // history.push('/main')
            
        }
   
    }

    // start created qui ttempt ind back end
    const StartButton = () => {

        return(
            <Grid>
                <Grid.Column textAlign="center">
                <Button size="massive" primary
                    onClick={async()=>{

                        const header = {
                            headers: {
                                authorization : localStorage.getItem('token')
                            }
                        }
                    
                        let body = {
                            // answer,
                            // question_id: question[activePage]._id
                        }
                            try{
                                let getExaminationId =  await axios.post('http://127.0.0.1:4040/examination/insert',body,header)
                                // console.log('Exam Attemp Sent')
                                setAnswer('')
                                setActivePage(0);
                                setExaminationId(getExaminationId.data)
                                // setExaminationId(getExaminationId)
                                // console.log(getExaminationId.data);


                                setStart(true);
                                
                        } catch(err){
                            // console.log('Examination number denied')
                            localStorage.clear();
                            history.push('/')
                        }
                                
                        // console.log(question[6] ? question[6].timer : 0 )
                    }}
                >Start Quiz</Button>
                </Grid.Column>
            </Grid>
        )
    }

    const editAnswer = (answer) =>{
        setAnswer(answer)
    }

    const Questionaires = (props) => {

        const handleChange = (e, { value }) => {
            props.editAnswer(value)
        }
        
        const RadButton = () => {

           return(


            props.question.choices?
            props.question.choices.map((it, ix)=>{
                return(
                    <Form.Field key={ix}>
                        <Radio
                            label={it}
                            name={'answer'}
                            value={it}
                            checked={answer === it}
                            onChange={handleChange}
                        
                        />
                    </Form.Field>
                )
            }) : null



           )
        }

            return(

                <React.Fragment>
                    <Grid style={{marginBottom:20}}>
                        <Form>
                            <Form.Field style={{fontSize:24}}>
                                
                            </Form.Field>

                        <Message>
                            <Message.Header><b>{(props.question.question ? props.question.question : '' )}</b></Message.Header>
                        
                        </Message>

                        <h4>{answer || '{no answer}'}</h4>
                        <Container>
                          <RadButton/>
                        </Container>

                        </Form>
                    </Grid>
                
                </React.Fragment>
            
            )
    }

    const MenuPane = () => {
        return(
            <React.Fragment>


                <Menu secondary>
                    <Menu.Item>
                       
                       
                       
                       { activePage === 0 && <Button
                        onClick={OnBack}
                        primary>Go back</Button>}
                    </Menu.Item>
                
                    <Menu.Menu position='right'>
            
                            <Button
                            onClick={OnForward}
                            primary>Next Page</Button>
                    </Menu.Menu>
                </Menu>

                <h3> {(1+activePage) + ' of 10'}</h3>
               


          


        </React.Fragment>
        )
    }

    const TestResultdata = ()=> {

        const ResultItems = () =>{
           
            return(

                <React.Fragment>
                    
                    { results.map((it, ix)=>{
                            return(
                                <Grid.Row key={it.question_id}>
                                
                                <Grid.Column>

                                    <Comment.Group>
                                        <Comment>
                                            <Comment.Content>
                                                <Comment.Author >
                                                    <h3>
                                                    {`${it.question} is  ${it.correctAnswer}`  }
                                                    </h3>
                                                </Comment.Author>
                                  

                                                
                                                <Comment.Text>
                                                    Your answer: {it.answer || '-no answer-'}   Points: {it.score}
                                                </Comment.Text>
                                            </Comment.Content>
                                        </Comment>
                                    </Comment.Group>
                        
                                </Grid.Column>
                        
                            </Grid.Row>
                            )
                        })}
                </React.Fragment>

            )
    
        }

        return(
            <Container  text style={{marginTop:"100px", padding:'20px'}}>
                    <Header as='h2' icon textAlign='center'>
                    <Button
                        onClick={
                            ()=>{
                                setDisplayresults(false);
                                setStart(false)
                            }
                        }
                    >Test Again</Button>
                    <hr/>
                    <Header.Content>Test Results: {

                        (results.map((it, ix)=>{
                                    return(it.score)
                                }) ).reduce((a, b) => a + b, 0)

                    } /30</Header.Content>
                    </Header>
                    <h3>Total Score: </h3>

                    <Grid columns={1} divided>
                        <ResultItems/>
                    </Grid>
    
    
            </Container>
        )
    }

    if(loading){
        return(
            <Loader size="massive" active/>
        )
    }

    return (
        <React.Fragment>
            <Menu>
                <Menu.Item onClick={()=>{history.push('/main')}}>
                    Quiz App
                </Menu.Item>

                <Menu.Item onClick={()=>{history.push('/results')}}>
                    Results
                </Menu.Item>


                <Menu.Item onClick={()=>{localStorage.clear() ;history.push('/')}} position='right'>
                    Log-Out
                </Menu.Item>
            </Menu>
            
            <Container   style={{marginTop:"50PX", padding:'20px'}}>
                {displayResults &&  <TestResultdata/>}
                {!start && !displayResults && <StartButton/>}
                {start && !displayResults && ( 
                            <React.Fragment>
                                <MenuPane/>   
                                <Questionaires editAnswer={editAnswer} question={question[activePage] ? question[activePage] : {}}/>
                            </React.Fragment>
                        )
                }

               



            </Container>
        </React.Fragment>
    )
}

export default Main