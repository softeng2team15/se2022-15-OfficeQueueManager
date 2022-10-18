const APIURL = new URL('http://localhost:3001/api/');

async function newTicket(serviceID){
    return new Promise((resolve, reject) => {
        const thisURL = "ticket/new/" + serviceID;
        fetch(new URL(thisURL, APIURL), {
            method: 'POST'})
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    response.json()
                        .then((message) => {reject(message);})
                        .catch(() => {reject({error: "Cannot parse server response. "})});
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. "}));
    });
}

async function updateCounterToTicket(ticketID, counterID){
    return new Promise((resolve, reject) => {
        const thisURL = "ticket/counter/"+ticketID+"/"+counterID;
        fetch(new URL(thisURL, APIURL), {
            method: 'PUT'})
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    response.json()
                        .then((message) => {reject(message);})
                        .catch(() => {reject({error: "Cannot parse server response. "})});
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. "}));
    });
}

async function setDoneToTicket(ticketID){
    return new Promise((resolve, reject) => {
        const thisURL = "ticket/done/" + ticketID; 
        fetch(new URL(thisURL, APIURL), {
            method: 'PUT'})
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    response.json()
                        .then((message) => {reject(message);})
                        .catch(() => {reject({error: "Cannot parse server response. "})});
                }
            })
            .catch(() => reject({ error: "Cannot communicate with the server. "}));
    });
}


async function getServiceList() {
  
    const response = await fetch(new URL("services", APIURL));
    const servicesJson = await response.json();
    if (response.ok) {
      return servicesJson.map((s) => ({ServiceID: s.ServiceID, ServiceName: s.ServiceName, TimeRequired: s.TimeRequired}));
    } else {
      throw servicesJson;  
    }
  }

const API = {newTicket, updateCounterToTicket, setDoneToTicket, getServiceList}
export default API;