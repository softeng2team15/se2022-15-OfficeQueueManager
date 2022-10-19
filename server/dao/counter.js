const db=require('./dao');
const dayjs=require('dayjs');
const weekMap={1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday",7:"Sunday"};
getLenQueuesAndExpectedTime=async counterId=>new Promise((resolve,reject)=>{
    const sql="SELECT S.ServiceID AS id,COUNT(*) AS len,TimeRequired FROM SERVICES_PER_COUNTER C,SERVICES S,TICKETS T WHERE C.CounterID=? AND C.ServiceID=S.ServiceID AND S.ServiceID=T.ServiceID AND T.Status='PENDING' GROUP BY C.CounterID,S.ServiceID,TimeRequired"
    db.all(sql,[counterId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        const arr=[]
        r.forEach(a=>arr.push({
            id:a.id,
            len:a.len,
            expectedTime:a.TimeRequired}));
        resolve(arr);
    });
});
getOfficerCounter=async username=>new Promise((resolve,reject)=>{
    const date=dayjs();
    const hourmin=date.format('HH:mm');
    const day=weekMap[date.day()];
    const sql="SELECT CounterID FROM OFFICERSCOUNTERS WHERE Username=? AND StartHour<=? AND EndHour>=? AND Day=?"
    db.get(sql,[username,hourmin,hourmin,day],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        else{
            if(typeof(r)!=='undefined')  resolve(r.CounterID);
            else reject({status:404,message:"Officer not working by timetables right now"});
        }
    });
});
countersServicesList=async counterId=>new Promise((resolve,reject)=>{
    const sql="SELECT S.ServiceID AS id, ServiceName,TimeRequired FROM SERVICES_PER_COUNTER SC,SERVICES S WHERE CounterID=? AND S.ServiceID=SC.ServiceID"
    db.all(sql,[counterId],(e,r)=>{
        if(e) reject({status:500,message:"Internal server error"});
        const arr=[]
        r.forEach(a=>arr.push({
            id:a.id,
            name:a.ServiceName,
            expectedTime:a.TimeRequired}));
        resolve(arr);
    });
});
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
const counter={getNumberOfServicesCounter,counterCanServe,countersService,getOfficerCounter,countersServicesList,getLenQueuesAndExpectedTime};
module.exports=counter;