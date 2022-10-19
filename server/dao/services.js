const db=require('./dao');
getAllServices=async ()=>new Promise((resolve,reject)=>{
    const sql="SELECT * FROM SERVICES"
    db.all(sql,[],(e,r)=>{
        if(e)   reject({status:500,message:"Internal server error"});
        resolve(r);
    });
});
getServiceWaitingTime=async serviceId=>new Promise((resolve,reject)=>{
    const sql="SELECT TimeRequired FROM SERVICES WHERE ServiceID=?"
    db.get(sql,[serviceId],(e,r)=>{
        if(e)   reject({status:500,message:"Internal server error"});
        else{
            if(typeof(r)!=='undefined')  resolve(r.TimeRequired);
            else reject({status:404,message:"Service is not present in the database"});
        }
    });
});

getServiceList = async () => new Promise((resolve, reject) => {
    const sql = 'SELECT ServiceID, ServiceName, TimeRequired FROM SERVICES';
    db.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }
        const services = rows.map((s) => ({ServiceID: s.ServiceID, ServiceName: s.ServiceName, TimeRequired: s.TimeRequired}));
        resolve(services);
    });
});

const services={getAllServices,getServiceWaitingTime,getServiceList}
module.exports=services;