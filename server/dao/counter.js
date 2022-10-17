const db=require('./dao');
getNumberOfServicesCounter=async counterId=>new Promise((resolve,reject)=>{
    const sql="SELECT COUNT(*) AS len FROM SERVICES_PER_COUNTER WHERE CounterID=?'"
    db.get(sql,[counterId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        resolve(r.len);
    });
});
counterCanServe=async counterId=>new Promise((resolve,reject)=>{
    const sql="SELECT ServiceID FROM SERVICES_PER_COUNTER WHERE CounterID=? AND ServiceID=?'"
    db.all(sql,[counterId,serviceId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        else{
            if(r.length>0)  resolve(true);
            else resolve(false);
        }
    });
});
countersService=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT CounterID, 1/COUNT(*) AS serviceFreq FROM SERVICES_PER_COUNTER WHERE ServiceID=? GROUP BY CounterID"
    db.all(sql,[serviceId],(e,r)=>{
        if(e)   reject({status:500,message:"Internal server error"});
        resolve(r);
    });
});
const counter={getNumberOfServicesCounter,counterCanServe,countersService};
module.exports=counter;