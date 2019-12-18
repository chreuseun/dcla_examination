import React, { useState, useEffect } from 'react'
import {useHistory, useRouteMatch,useLocation} from 'react-router-dom'
import { Menu, Container, Button,Loader, Table,Segment, Label  } from 'semantic-ui-react'
import axios from 'axios'

const Main = (props) => {

    const history = useHistory();
    const match = useRouteMatch();
    const location =useLocation();

    const [loading , setLoading] =useState(true);
    const [quizes, setQuizes] =useState([]);

    useEffect(()=>{
        let UpdateHook = true;

        const InitialFetch = async() =>{
            try{
                let fethcUSERS = await axios.get(`http://127.0.0.1:4040/examinations/${match.params.studentId}`, {});
          
                if(UpdateHook){
                    setQuizes(fethcUSERS.data.data);
                    setLoading(false);
                }

            }catch(err){
                history.push('/main')
            }
        }

        InitialFetch();

        
        return ( () => {UpdateHook = false;})

    },[])

    if(loading){
        return(
            <Loader size="massive" active/>
        )
    }

    const QuizesItems = () => {
        return(
            <React.Fragment>
                {
                    quizes.map((it,id)=>{
                        return(
                                <Table.Row key={it._id} onClick={()=>{history.push({
                                    pathname:  `${match.url}/${it._id}`,
                                    state: { referrer : match.url }
                                })}}>
                                    <Table.Cell>
                                        <Label>Quiz {it._id}</Label>
                                    </Table.Cell>
                                </Table.Row>    
                        )
                    })
                }
            </React.Fragment>
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

                <Button secondary  onClick={ () => { history.push(location.state.referrer)}}>Go Back</Button>

                <Segment style={{ overflow: 'auto', maxHeight: '1000vh' }}>
                    <Segment.Group horizontal>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>Quizes</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                               
                                <QuizesItems/>

                            </Table.Body>

                        </Table>
                    </Segment.Group>

                </Segment>

            </Container>
        </React.Fragment>
    )
}

export default Main