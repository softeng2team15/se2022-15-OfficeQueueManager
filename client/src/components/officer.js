import { useNavigate, useParams } from "react-router-dom"
import {Alert, Button} from 'react-bootstrap'
import { useEffect, useState } from "react";
import API from "../API";
import ServicesCounter from "./servicesCounter";
function Officer(props){
    const {username}=useParams();
    const [serving,setServing]=useState(-1);
    const [counter,setCounter]=useState(-1);
    const [empty,setEmpty]=useState(false);
    const navigate=useNavigate();
    const serveNext=async()=>{
        try {
            const tick=await API.getNext();
            setServing(tick);
            setEmpty(false);
        } catch (error) {
            setServing(-1);
            if(error===404){
                setEmpty(true);
                setTimeout(()=>setEmpty(false),3000);
            }
        }
    }
    useEffect(()=>{
        const getOff=async()=>{
            try {
                const offCount=await API.getOfficerCounter();
                setCounter(offCount);
                props.setLogged(true);
            } catch (error) {
                setServing(-1);
                setCounter(-1);
                if(error===401){
                    props.setLogged(false);
                    navigate('/');
                }
            }
        }
        getOff()
    });
    if (counter!==-1) return(
        <>
            <div className="text-center mt-5 mx-auto justify-content-center" style={{width:"85%"}}>
                <Alert variant="primary">
                    <Alert.Heading>Hey officer {username}, nice to see you</Alert.Heading>
                    <h5>
                        for this shift you are working at counter {counter}, so here is the list of services that can be served by you:
                    </h5>
                </Alert>
            </div>
            <ServicesCounter counter={counter}/>
            {serving!==-1?
                <div className="mx-auto text-center my-3">
                    <Button variant="outline-secondary" size="lg" disabled>Serving customer {serving}...</Button>
                    <Button variant="outline-danger" className="mx-3" size="lg" onClick={()=>setServing(-1)}>Terminate serving cutomer {serving}</Button>
                </div>
                :
                <div className="mx-auto text-center my-3">
                    <Button variant="outline-success" size="lg" onClick={()=>serveNext()}>Get next customer!</Button>
                </div>
            }
            {empty?
                <div className="text-center my-3 mx-auto justify-content-center" style={{width:"85%"}}>
                    <Alert variant="warning">
                        <h5>All the services queues that can be served by this counter are empty</h5>
                    </Alert>
                </div>
                :
                <></>
            }
        </>
    )
    else return(
        <div className="text-center mt-5 mx-auto justify-content-center" style={{width:"85%"}}>
                <Alert variant="primary">
                    <Alert.Heading>Hey officer {username}, nice to see you</Alert.Heading>
                    <h5>
                        you don't have any work shift now, have a nice day :) !
                    </h5>
                </Alert>
            </div>
    )
}

export default Officer;