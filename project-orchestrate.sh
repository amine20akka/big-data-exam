#!/bin/sh

# Create casandra schema
docker exec cassandra-iot cqlsh --username cassandra --password cassandra  -f /schema.cql

# Create our folders on Hadoop file system and total permission to those
docker exec namenode hdfs dfs -rm -r /lambda-arch
docker exec namenode hdfs dfs -mkdir /lambda-arch
docker exec namenode hdfs dfs -mkdir /lambda-arch/checkpoint
docker exec namenode hdfs dfs -chmod -R 777 /lambda-arch
docker exec namenode hdfs dfs -chmod -R 777 /lambda-arch/checkpoint
docker exec namenode hdfs dfs -chown -R 777 /lambda-arch
docker exec namenode hdfs dfs -chown -R 777 /lambda-arch/checkpoint