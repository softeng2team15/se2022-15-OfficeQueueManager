const APIURL = new URL('http://localhost:3001/api/');

async function newTicket(serviceID){
    return new Promise((resolve, reject) => {
        fetch(new URL("ticket/new", APIURL), {
            method: 'POST',
            body: JSON.stringify(serviceID)})
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    console.log("RESPONSE" + response);
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
        fetch(new URL("ticket/counter", APIURL), {
            method: 'PUT',
            body: JSON.stringify(ticketID, counterID)})
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

async function setDoneToTicket(ticketID, counterID){
    return new Promise((resolve, reject) => {
        fetch(new URL("ticket/done", APIURL), {
            method: 'PUT',
            body: JSON.stringify(ticketID)})
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

async function getServiceList(ticketID, counterID){
    return new Promise((resolve, reject) => {
        fetch(new URL("ticket/services", APIURL))
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