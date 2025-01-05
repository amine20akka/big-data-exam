package com.apssouza.iot.batch;

import com.apssouza.iot.common.dto.IoTData;
import com.apssouza.iot.common.ProcessorUtils;
import com.apssouza.iot.common.PropertyFileReader;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.Properties;

/**
 * Class responsible to start the process from the parque file
 */
public class BatchProcessor {
    public static void main(String[] args) throws Exception {
        String fileProp = "iot-spark.properties";
        Properties prop = PropertyFileReader.readPropertyFile(fileProp);
        prop.setProperty("com.iot.app.spark.app.name", "Iot Batch Processor");

        var file = prop.getProperty("com.iot.app.hdfs") + "iot-data-parque";
        String[] jars = {prop.getProperty("com.iot.app.jar")};
        var conf = ProcessorUtils.getSparkConf(prop, "batch-processor");
        conf.setJars(jars);
        var sparkSession = SparkSession.builder().config(conf).getOrCreate();

        var dataFrame = getDataFrame(sparkSession, file);
        var rdd = dataFrame.javaRDD().map(BatchProcessor::transformToIotData);
        BatchTrafficDataProcessor.processTotalTrafficData(rdd);
        BatchTrafficDataProcessor.processWindowTrafficData(rdd);
        sparkSession.close();
        sparkSession.stop();
    }

    private static  IoTData transformToIotData(Row row) {
        return new IoTData(
                    row.getString(4),
                    row.getString(5),
                    row.getString(1),
                    row.getDate(3),
                    row.getDouble(2),
                    row.getDouble(0)
            );
    }


    public static Dataset<Row> getDataFrame(SparkSession sqlContext, String file) {
        return sqlContext.read()
                .parquet(file);
    }

}

