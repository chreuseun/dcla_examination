import React, { useState, useEffect } from 'react'
import {useHistory, useRouteMatch} from 'react-router-dom'
import { Menu, Container,Loader, Button, Table,Segment, Label  } from 'semantic-ui-react'
import axios from 'axios'

const Main = (props) => {

    const history = useHistory();
    const match = useRouteMatch();

    const [loading , setLoading] =useState(true);
    const [students, setStudents] =useState([]);


    useEffect(()=>{

        let UpdateHook = true;



       
        const InitialFetch = async() =>{

            try{
                let fethcUSERS = await axios.get('http://127.0.0.1:4040/user/find', {});
                console.log(fethcUSERS.data)
                if(UpdateHook){
                    setStudents(fethcUSERS.data);
                }
            }catch(err){
                history.push('/main')
            }
            
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

    const StudentItems = () => {
        return(
            <React.Fragment>
                {
                    students.map((it,id)=>{
                        return(
                            <Table.Row key={it._id} onClick={()=>{history.push( 
                            {
                                pathname:  `/results/${it._id}`,
                                    state: { referrer : match.url }
                            }
                            )}}>
                                    <Table.Cell>
                                        <Label>{it.username}</Label>
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

                

                <Segment style={{ overflow: 'auto', maxHeight: '1000vh' }}>
                    <Segment.Group horizontal>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>Exam Takers</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                               
                                <StudentItems/>

                            </Table.Body>

                        </Table>
                    </Segment.Group>


                </Segment>



            </Container>
        </React.Fragment>
    )
}

export default Main