const db=require('./dao');
getNumberOfServicesCounter=async counterId=>new Promise((resolve,reject)=>{
    const sql="SELECT COUNT(*) AS len FROM SERVICES_PER_COUNTER WHERE CounterID=?'"
    db.get(sql,[counterId],(e,r)=>{
        if(e) reject(500);
        else{
            if(typeof(r)!=='undefined')  resolve(r.len);
            else reject(401);
        }
    });
});
counterCanServe=async counterId=>new Promise((resolve,reject)=>{
    const sql="SELECT ServiceID AS len FROM SERVICES_PER_COUNTER WHERE CounterID=? AND ServiceID=?'"
    db.get(sql,[counterId,serviceId],(e,r)=>{
        if(e) reject(500);
        else{
            if(typeof(r)!=='undefined')  resolve(true);
            else reject(401);
        }
    });
});
countersService=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT CounterID, 1/COUNT(*) AS serviceFreq FROM SERVICES_PER_COUNTER WHERE ServiceID=? GROUP BY CounterID'"
    db.all(sql,[counterId,serviceId],(e,r)=>{
        if(e) reject(500);
        else{
            if(typeof(r)!=='undefined')  resolve(r);
            else reject(401);
        }
    });
});
const counter={getNumberOfServicesCounter,counterCanServe,countersService};
module.exports=counter;