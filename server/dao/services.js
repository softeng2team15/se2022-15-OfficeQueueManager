const db=require('./dao');
getServiceWaitingTime=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT TimeRequired FROM SERVICE WHERE ServiceID=?"
    db.get(sql,[serviceId],(e,r)=>{
        if(e) reject(500);
        else{
            if(typeof(r)!=='undefined')  resolve(r);
            else reject(401);
        }
    });
});
const servicesDao={getServiceWaitingTime}
module.exports=servicesDao;