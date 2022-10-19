import { Table} from 'react-bootstrap'
import API from '../API';
import { useState,useEffect } from "react";
import ServiceRow from "./serviceRow";
function ServicesCounter(props){
    const [serviceList,setServiceList]=useState([{id:2,name:"post",expectedTime:2},{id:1,name:"cards",expectedTime:13}]);
    useEffect(()=>{
        const getServices=async()=>{
            try{
                const services=await API.getServicesCounter(props.counter);
                setServiceList(services);
            }catch(error){
                setServiceList([]);
            }
        }
        getServices();
      },[props.counter]);
    return(
        <Table responsive striped bordered hover className="mx-auto my-3" size="sm" style={{
            "width":"85%"
        }}>
            <thead>
                <tr>
                    <th>Service ID</th>
                    <th>Service name</th>
                    <th>Service expected time</th>
                </tr>
            </thead>
            <tbody>
                {serviceList.map(r=><ServiceRow service={r} key={r.id}/>)}
            </tbody>
        </Table>
    )
}

export default ServicesCounter;