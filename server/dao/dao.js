const fs = require("fs");
const sqlite=require('sqlite3');


const db = new sqlite.Database('database.db', (err) => {
	if (err) {
		throw err;
	}
	else {
		console.log("Open DB: Success!");
	}
});

/*
const initQueries=async()=>{
    const dataArr = dataSql.toString().split(");");
    db.serialize(() => {
        db.run("PRAGMA foreign_keys=OFF;");
        db.run("BEGIN TRANSACTION;");
            dataArr.forEach(query => {
                if (query) {
                query += ");";
                db.run(query, err => {
                    if (err) throw err;
                });
                }
            });
        db.run("COMMIT;");
    });
};
/*
let restart;
if(fs.existsSync(__dirname+'/database.db'))   restart=true;
else    restart=false;
const dataSql = fs.readFileSync(__dirname+"/initQueries.sql").toString();
const db=new sqlite.Database(__dirname+'/database.db',e=>{
    if(e) throw "Failed to create the database";
    else{
        if(!restart)   initQueries().then().catch(e=>{throw e});
    }
})
*/

exports.newTicket = (serviceID) => {

    return new Promise((resolve, reject) => {
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
                
                //I think this could be improved
                
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
};

exports.updateCounterToTicket = (ticketID, counterID) => {
    console.log(ticketID + " " + counterID);
	return new Promise((resolve, reject) => {
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
};

exports.setDoneToTicket = (ticketID) => {
	return new Promise((resolve, reject) => {
		const sql = 'UPDATE TICKETS SET Status=? WHERE TicketID = ?';
		db.run(sql, ["DONE", ticketID], (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
};

exports.getServiceList = () => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT ServiceName FROM SERVICES';
		db.all(sql, [], (err, rows) => {
			if (err) {
				reject(err);
				return;
			}
            const services = rows.map((s) => s.ServiceName)
			resolve(services);
		});
	});
};



//module.exports=db;