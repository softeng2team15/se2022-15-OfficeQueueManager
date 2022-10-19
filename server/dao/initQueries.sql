CREATE TABLE IF NOT EXISTS TICKETS(TicketID INTEGER NOT NULL PRIMARY KEY,Date VARCHAR NOT NULL,CounterID INTEGER,ServiceID INTEGER NOT NULL,Status VARCHAR NOT NULL);
CREATE TABLE IF NOT EXISTS SERVICES_PER_COUNTER(CounterID INTEGER NOT NULL,ServiceID INTEGER NOT NULL, PRIMARY KEY(CounterID,ServiceID));
CREATE TABLE IF NOT EXISTS SERVICES(ServiceID INTEGER NOT NULL PRIMARY KEY,ServiceName VARCHAR,TimeRequired INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS OFFICERSCOUNTERS(Username VARCHAR NOT NULL,StartHour VARCHAR NOT NULL,EndHour VARCHAR NOT NULL, Day VARCHAR NOT NULL, CounterID INTEGER NOT NULL, PRIMARY KEY(Username,StartHour,EndHour,Day));
CREATE TABLE IF NOT EXISTS EMPLOYEES(Username VARCHAR NOT NULL PRIMARY KEY,Type VARCHAR NOT NULL,Password VARCHAR NOT NULL,Salt VARCHAR NOT NULL);

INSERT INTO TICKETS(TicketID,Date,CounterID,ServiceID,Status)
VALUES  (0,'2022/05/16 15:33',1,1,'DONE'),
        (1,'2022/05/16 15:34',0,3,'DONE'),
        (2,'2022/05/16 16:42',3,2,'DONE'),
        (3,'2022/05/16 16:44',NULL,0,'PENDING'),
        (4,'2022/05/16 16:46',NULL,2,'PENDING'),
        (5,'2022/05/16 16:46',NULL,2,'PENDING'),
        (6,'2022/05/16 16:46',NULL,2,'PENDING'),
        (7,'2022/05/16 16:46',NULL,2,'PENDING');
INSERT INTO SERVICES_PER_COUNTER(CounterID,ServiceID)
VALUES  (0,1),
        (0,3),
        (1,1),
        (2,0),
        (2,2),
        (3,2);
INSERT INTO SERVICES(ServiceID,ServiceName,TimeRequired)
VALUES  (0,'Mail',5),
        (1,'Billing',2),
        (2,'Digital Identity',13),
        (3,'Credit Card',7);
INSERT INTO OFFICERSCOUNTERS(Username,StartHour,EndHour,Day,CounterID)
VALUES  ('jon','09:00','17:00','Wednesday',2);
INSERT INTO EMPLOYEES(Username,Type,Password,Salt)
VALUES  ('jon','officer','b3d26f05c724ac8d69b7a36cc53fd88726f4e1bd047896f717c921fbf6ccd74a','e657ff533e95a4ad9baed9623f5e365f');