const db=require('./dao');

newTicket = async (serviceID) => new Promise((resolve, reject) => {
		const sql_in = 'INSERT INTO TICKETS (TicketID, CounterID, ServiceID, Status, Date) VALUES (NULL, NULL, ?, ?, ?)';
        const sql_out = 'SELECT MAX(TicketID) AS ticketID FROM TICKETS'

        db.serialize(() => {
                db.run(sql_in, [serviceID, "PENDING", "TODAY"], (err) => {
                    if (err) {
                        console.log(err)
                        reject(err);
                        return;
                    }
                });
                                
                db.get(sql_out, [], (err, row) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    console.log(row.ticketID)
                    resolve(row.ticketID);
                });
            }
        );
	});

updateCounterToTicket = async (ticketID, counterID) =>  new Promise((resolve, reject) => {
		const sql = 'UPDATE TICKETS SET CounterID = ? , Status=? WHERE TicketID = ?';
		db.run(sql, [counterID, "SERVING", ticketID], (err) => {
			if (err) {
                console.log(err);
				reject(err);
				return;
			}
			resolve();
		});
	});

setDoneToTicket = async (ticketID) => new Promise((resolve, reject) => {
		const sql = 'UPDATE TICKETS SET Status=? WHERE TicketID = ?';
		db.run(sql, ["DONE", ticketID], (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});

const tickets={newTicket, updateCounterToTicket, setDoneToTicket};

module.exports=tickets;