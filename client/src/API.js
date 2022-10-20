import ServiceClass from "./lib/serviceClass";
const APIURL = new URL('http://localhost:3001/api/');
const APIBASE='http://localhost:3001/api/';

const login=async(username,password)=>{
    const res=await fetch(APIBASE+'login',{
        method:'POST',
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({username:username,password:password}),
        credentials:"include"
    });
    const emp=await res.json();
    if(res.ok) return emp;
    else throw emp;
}

const logout=async()=>{
    const res=await fetch(APIBASE+'logout',{
        method:"DELETE",
        headers:{
            "Content-type": "application/json"
        },
        credentials:"include"
    });
    if(res.ok) return;
    else{
        const ret=await res.json();
        throw ret;
    }
}
const getServicesCounter=async counterId=>{
    const res=await fetch(APIBASE+'counter/'+counterId+'/services');
    const services=await res.json();
    if(res.ok)  return services.map(s=>new ServiceClass(s.id,s.name,s.expectedTime));
    else throw res.status;
}
const getOfficerCounter=async ()=>{
    const res=await fetch(APIBASE+'officer/counter',{
        credentials:"include"
    });
    const counter=await res.json();
    if(res.ok)  return counter;
    else throw res.status;
}
const getNext=async ()=>{
    const res=await fetch(APIBASE+'officer/serve',{
        credentials:"include"
    });
    const ticket=await res.json();
    if(res.ok)  return ticket;
    else throw res.status;
}
async function newTicket(serviceID) {
    return new Promise((resolve, reject) => {
        const thisURL = "ticket/new/" + serviceID;
        fetch(new URL(thisURL, APIURL), {
            method: 'POST'
        })
            .then((response) => {
                if (response.ok) {
                    resolve(response.json())
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

async function updateCounterToTicket(ticketID, counterID) {
    return new Promise((resolve, reject) => {
        const thisURL = "ticket/counter/" + ticketID + "/" + counterID;
        fetch(new URL(thisURL, APIURL), {
            method: 'PUT'
        })
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

async function setDoneToTicket(ticketID) {
    return new Promise((resolve, reject) => {
        const thisURL = "ticket/done/" + ticketID;
        fetch(new URL(thisURL, APIURL), {
            method: 'PUT'
        })
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

async function getServiceList() {
    return new Promise((resolve, reject) => {
        fetch(new URL("ticket/services", APIURL))
            .then((response) => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}


async function getServiceLength(ticketId) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`/api/tickets/${ticketId}/queueLength`, APIURL))
            .then((response) => {
                if (response.ok) {
                    resolve(response.json())
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

async function getRemainingTimeToServe(ticketId) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`/api/customer/waitingTime/${ticketId}`, APIURL))
            .then((response) => {
                if (response.ok) {
                    response.json().then(r=>resolve(r));
                } else {
                    response.json()
                        .then((message) => { reject(message); })
                        .catch(() => { reject({ error: "Cannot parse server response. " }) });
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. " }));
    });
}

const API = { newTicket, updateCounterToTicket, setDoneToTicket, getServiceList, getServiceLength, getRemainingTimeToServe ,getServicesCounter,getOfficerCounter,login,logout,getNext}
export default API;