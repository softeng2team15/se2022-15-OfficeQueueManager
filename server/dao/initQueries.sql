CREATE TABLE IF NOT EXISTS TICKETS(ticketId INTEGER NOT NULL PRIMARY KEY,dateTime VARCHAR NOT NULL,counterId INTEGER NOT NULL,serviceId INTEGER NOT NULL,status VARCHAR NOT NULL);
CREATE TABLE IF NOT EXISTS COUNTERSERVICES(counterId INTEGER NOT NULL PRIMARY KEY,serviceId INTEGER NOT NULL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS SERVICES(serviceId INTEGER NOT NULL PRIMARY KEY,serviceName VARCHAR,expectedTime INTEGER NOT NULL);

INSERT INTO TICKETS(ticketId,dateTime,counterId,serviceId,status)
VALUES  (0,'2022/05/16 15:33',1,1,'COMPLETED'),
        (1,'2022/05/16 15:34',0,3,'COMPLETED'),
        (2,'2022/05/16 16:42',3,2,'COMPLETED'),
        (3,'2022/05/16 16:44',2,0,'PENDING'),
        (4,'2022/05/16 16:46',3,2,'PENDING');
INSERT INTO COUNTERSERVICES(counterId,serviceId)
VALUES  (0,1),
        (0,3),
        (1,1),
        (2,0),
        (2,2),
        (3,2);
INSERT INTO SERVICES(serviceId,serviceName,expectedTime)
VALUES  (0,'Mail',5),
        (1,'Billing',2),
        (2,'Digital Identity',13),
        (3,'Credit Card',7);