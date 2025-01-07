package com.apssouza.iot.dashboard;

import java.io.Serializable;
import java.util.List;

import com.apssouza.iot.dao.entity.TotalTrafficData;
import com.apssouza.iot.dao.entity.WindowTrafficData;

/**
 * Response object containing traffic details that will be sent to dashboard.
 *
 */
public class Response implements Serializable {
    private List<TotalTrafficData> totalTraffic;
    private List<WindowTrafficData> windowTraffic;

    public List<TotalTrafficData> getTotalTraffic() {
        return totalTraffic;
    }

    public void setTotalTraffic(List<TotalTrafficData> totalTraffic) {
        this.totalTraffic = totalTraffic;
    }

    public List<WindowTrafficData> getWindowTraffic() {
        return windowTraffic;
    }

    public void setWindowTraffic(List<WindowTrafficData> windowTraffic) {
        this.windowTraffic = windowTraffic;
    }
}
