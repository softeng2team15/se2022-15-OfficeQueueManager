const db=require('./dao');
getLenghtQueueService=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT COUNT(*) AS len FROM TICKETS WHERE ServiceID=? AND Status='PENDING'"
    db.get(sql,[serviceId],(e,r)=>{
        if(e) reject(500);
        else{
            if(typeof(r)!=='undefined')  resolve(r.len);
            else reject(401);
        }
    });
});
getAheadLengthService=async (ticketId,serviceId)=>new Promise((resolve,reject)=>{
    const sql="SELECT COUNT(*) AS len FROM TICKETS WHERE ServiceID=? AND Status='PENDING' AND TicketID<?"
    db.get(sql,[serviceId,ticketId],(e,r)=>{
        if(e) reject(500);
        else{
            if(typeof(r)!=='undefined')  resolve(r.len);
            else reject(401);
        }
    });
});
const tickets={getLenghtQueueService,getAheadLengthService};
module.exports=tickets;