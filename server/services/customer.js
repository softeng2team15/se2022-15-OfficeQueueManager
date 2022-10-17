const services=require('../dao/services');
const tickets=require('../dao/tickets');
const counter=require('../dao/counter');

getWaitingTime=async ticketId=>{
    try {
        const serviceId=await tickets.getServiceTicket(ticketId);
        const serviceTime=await services.getServiceWaitingTime(serviceId);
        const lenQueueAhead=await tickets.getAheadLengthService(ticketId,serviceId);
        const countersService=await counter.countersService(serviceId);
        let den=0;countersService.forEach(r=>den+=r.serviceFreq);
        return serviceTime*((lenQueueAhead/den)+0.5);
    } catch (error) {
        throw error;
    }
}
const customer={getWaitingTime};
module.exports=customer;