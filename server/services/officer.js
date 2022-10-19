const tickets=require('../dao/tickets');
const counter=require('../dao/counter');
getCounter=async username=>{
    try {
        const ret=await counter.getOfficerCounter(username);
        return ret;
    } catch (error) {
        throw error;
    }
}

getNext=async username=>{
    try {
        const counterId=await getCounter(username);
        const services=await counter.getLenQueuesAndExpectedTime(counterId);
        let serviceToServe=-1,maxLen=-1,minTime=-1;
        for(const s of services){
            if(s.len>maxLen){
                maxLen=s.len;minTime=s.expectedTime;serviceToServe=s.id;
            }
            else if(s.len===maxLen && (minTime===-1 || s.TimeRequired<=minTime)){
                maxLen=s.len;minTime=s.expectedTime;serviceToServe=s.id;
            }
        }
        if(serviceToServe!==-1){
            const ticket=await tickets.getFirstInLine(serviceToServe);
            await tickets.setTicketServed(ticket,counterId);
            return ticket;
        }
        else throw {status:404,message:"All the queues associated to the counter are empty"};
    } catch (error) {
        throw error;
    }
}
const officer={getCounter,getNext};
module.exports=officer;