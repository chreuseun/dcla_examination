import React, { useState, useEffect } from 'react'
import {useHistory, useRouteMatch, useLocation} from 'react-router-dom'
import { Menu, Container,Loader,Button, Table,Segment } from 'semantic-ui-react'
import axios from 'axios'

const Main = (props) => {

    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();

    const [loading , setLoading] = useState(true);
    const [quizes, setQuizes] = useState([]);

    useEffect(()=>{
        let UpdateHook = true;


        console.log(history);
        console.log(match);
        console.log(location);

        const InitialFetch = async() =>{

            try{
                if(UpdateHook){
                    setLoading(true);
                }

                let getQuizDetails = await axios.get(`http://127.0.0.1:4040/answer/${match.params.quizId}`, {});
 
                if(UpdateHook){

                    if(UpdateHook){
                        setQuizes(getQuizDetails.data.data);
                    }

                    if(UpdateHook){
                        setLoading(false);
                    }
                    
                }
            }catch(err){
                history.push('/main')
            }

            return(()=> {UpdateHook = false})
            
        }

        InitialFetch();

        if(UpdateHook){
            setLoading(false)
        }

        return ( () => {UpdateHook = false;})

    },[])

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


                <Menu.Item onClick={()=>{localStorage.clear() ; history.push('/')}} position='right'>
                    Log-Out
                </Menu.Item>
            </Menu>
            
            <Container   style={{marginTop:"50PX", padding:'20px'}}>
                
                <Button secondary  onClick={ () => { history.push(location.state.referrer)}}>Go Back</Button>

                <Segment style={{ overflow: 'auto', maxHeight: '1000vh' }}>
                    <Segment.Group horizontal>


                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>Quiz {match.params.quizId}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                               
                            <Table.Row >
                                <Table.Cell>
                                 Score: {
                                  
                                    (quizes.map((it, ix)=>{
                                        return(it.score)
                                    }) ).reduce((a, b) => a + b, 0)
                                    
                                 } 
                                </Table.Cell>
                            </Table.Row>

                            </Table.Body>

                        </Table>
                    </Segment.Group>

                </Segment>

            </Container>
        </React.Fragment>
    )
}

export default Main