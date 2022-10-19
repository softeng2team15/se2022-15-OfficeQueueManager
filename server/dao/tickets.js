const db=require('./dao');
setTicketServed=async (ticketId,counterId)=>new Promise((resolve,reject)=>{
    const sql="UPDATE TICKETS SET Status=?,CounterID=? WHERE TicketID=?";
    db.run(sql,['DONE',counterId,ticketId],e=>{
        if(e) reject({status:500,message:"Internal server error"});
        resolve();
    });
});
getFirstInLine=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT MIN(TicketID) AS ticket FROM TICKETS WHERE ServiceID=? AND Status='PENDING'";
    db.get(sql,[serviceId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        resolve(r.ticket);
    });
});
getLenghtQueueService=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT COUNT(*) AS len FROM TICKETS WHERE ServiceID=? AND Status='PENDING'";
    db.get(sql,[serviceId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        resolve(r.len);
    });
});
getAheadLengthService=async (ticketId,serviceId)=>new Promise((resolve,reject)=>{
    const sql="SELECT COUNT(*) AS len FROM TICKETS WHERE ServiceID=? AND Status='PENDING' AND TicketID<?";
    db.get(sql,[serviceId,ticketId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        resolve(r.len);
    });
});
getServiceTicket=async ticketId=>new Promise((resolve,reject)=>{
    const sql="SELECT ServiceID FROM TICKETS WHERE TicketID=? AND Status='PENDING'";
    db.get(sql,[ticketId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        else{
            if(typeof(r)!=='undefined')  resolve(r.ServiceID);
            else reject({status:404,message:"Ticket not present or ticket already completed"});
        }
    });
});
const tickets={getLenghtQueueService,getAheadLengthService,getServiceTicket,getFirstInLine,setTicketServed};
module.exports=tickets;