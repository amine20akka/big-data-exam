//Create keyspace
CREATE KEYSPACE IF NOT EXISTS TrafficKeySpace WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};

//Create table
CREATE TABLE TrafficKeySpace.Total_Traffic (routeId text ,  vehicleType text,  totalCount bigint, timeStamp timestamp,recordDate text,PRIMARY KEY (routeId,recordDate,vehicleType));
CREATE TABLE TrafficKeySpace.Window_Traffic (routeId text , vehicleType text,  totalCount bigint, timeStamp timestamp,recordDate text,PRIMARY KEY (routeId,recordDate,vehicleType));
CREATE TABLE TrafficKeySpace.Total_Traffic_batch (routeId text ,  vehicleType text,  totalCount bigint, timeStamp timestamp,recordDate text,PRIMARY KEY (routeId,recordDate,vehicleType));

//drop table TrafficKeySpace.Total_Traffic;
//drop table TrafficKeySpace.Window_Traffic;
//drop table TrafficKeySpace.Total_Traffic_batch;