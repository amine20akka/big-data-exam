package com.apssouza.iot.dashboard;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.apssouza.iot.dao.TotalTrafficDataRepository;
import com.apssouza.iot.dao.entity.TotalTrafficData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.apssouza.iot.dao.WindowTrafficDataRepository;
import com.apssouza.iot.dao.entity.WindowTrafficData;

/**
 * Service class to send traffic data messages to dashboard ui at fixed interval using web-socket.
 */
@Service
public class TrafficDataService {
    private static final Logger logger = Logger.getLogger(TrafficDataService.class.getName());

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private TotalTrafficDataRepository totalRepository;

    @Autowired
    private WindowTrafficDataRepository windowRepository;

    private static DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    //Method sends traffic data message in every 15 seconds.
    @Scheduled(fixedRate = 15000)
    public void trigger() {
        List<TotalTrafficData> totalTrafficList = new ArrayList<>();
        List<WindowTrafficData> windowTrafficList = new ArrayList<>();
        // Call dao methods
        totalRepository.findTrafficDataByDate(sdf.format(new Date())).forEach(e -> totalTrafficList.add(e));
        windowRepository.findTrafficDataByDate(sdf.format(new Date())).forEach(e -> windowTrafficList.add(e));
        // Prepare response
        Response response = new Response();
        response.setTotalTraffic(totalTrafficList);
        response.setWindowTraffic(windowTrafficList);
        logger.info("Sending to UI " + response);
        // Send to UI
        this.template.convertAndSend("/topic/trafficData", response);
    }

}
