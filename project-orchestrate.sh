#!/bin/sh

########################################################################
# title:          Build Complete Project
# description:    Build complete Big data pipeline
########################################################################

# Create casandra schema
docker exec cassandra-iot cqlsh --username cassandra --password cassandra  -f data/schema.cql

# Create Kafka topic "iot-data-event"
docker exec kafka-iot kafka-topics --create --topic iot-data-event --partitions 1 --replication-factor 1 --if-not-exists --zookeeper zookeeper:2181

# Create our folders on Hadoop file system and total permission to those
docker exec namenode hdfs dfs -rm -r /lambda-arch
docker exec namenode hdfs dfs -mkdir /lambda-arch
docker exec namenode hdfs dfs -mkdir /lambda-arch/checkpoint
docker exec namenode hdfs dfs -chmod -R 777 /lambda-arch
docker exec namenode hdfs dfs -chmod -R 777 /lambda-arch/checkpoint
docker exec namenode hdfs dfs -chown -R 777 /lambda-arch
docker exec namenode hdfs dfs -chown -R 777 /lambda-arch/checkpoint