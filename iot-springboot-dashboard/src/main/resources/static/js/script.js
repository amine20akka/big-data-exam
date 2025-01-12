var totalTrafficChartData = {
    labels: ["Vehicle"],
    datasets: [{
        label: "Route",
        data: [1]
    }]
};

var route37TrafficChartData = {
    labels: ["Vehicle"],
    datasets: [{
        data: [1]
    }]
};

var route43TrafficChartData = {
    labels: ["Vehicle"],
    datasets: [{
        data: [1]
    }]
};

var route82TrafficChartData = {
    labels: ["Vehicle"],
    datasets: [{
        data: [1]
    }]
};

jQuery(document).ready(function () {
    // Charts
    var ctx1 = document.getElementById("totalTrafficChart").getContext("2d");
    window.tChart = new Chart(ctx1, {
        type: 'bar',
        data: totalTrafficChartData
    });

    var ctx2 = document.getElementById("route37TrafficChart").getContext("2d");
    window.r37Chart = new Chart(ctx2, {
        type: 'doughnut',
        data: route37TrafficChartData
    });

    var ctx3 = document.getElementById("route43TrafficChart").getContext("2d");
    window.r43Chart = new Chart(ctx3, {
        type: 'doughnut',
        data: route43TrafficChartData
    });

    var ctx4 = document.getElementById("route82TrafficChart").getContext("2d");
    window.r82Chart = new Chart(ctx4, {
        type: 'doughnut',
        data: route82TrafficChartData
    });

    // Tables
    var totalTrafficList = jQuery("#total_traffic");
    var windowTraffic37List = jQuery("#window_traffic_37");
    var windowTraffic43List = jQuery("#window_traffic_43");
    var windowTraffic82List = jQuery("#window_traffic_82");

    // Use SockJS
    var socket = new SockJS('/stomp');
    var stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        // Subscribe "/topic/trafficData" message
        stompClient.subscribe("/topic/trafficData", function (data) {
            var dataList = data.body;
            var resp = jQuery.parseJSON(dataList);

            // Total traffic
            var totalOutput = '';
            jQuery.each(resp.totalTraffic, function (i, vh) {
                totalOutput += "<tbody><tr><td>" + vh.routeId + "</td><td>" + vh.vehicleType + "</td><td>" + vh.totalCount + "</td></tr></tbody>";
            });
            var t_tabl_start = "<table class='table table-bordered table-condensed table-hover innerTable'><thead><tr><th>Route</th><th>Vehicle</th><th>Count</th></tr></thead>";
            var t_tabl_end = "</table>";
            totalTrafficList.html(t_tabl_start + totalOutput + t_tabl_end);

            // Window traffic for Route-37
            updateTrafficTable(resp.windowTraffic, "Route-37", windowTraffic37List);

            // Window traffic for Route-43
            updateTrafficTable(resp.windowTraffic, "Route-43", windowTraffic43List);

            // Window traffic for Route-82
            updateTrafficTable(resp.windowTraffic, "Route-82", windowTraffic82List);

            // Draw total traffic chart
            drawBarChart(resp.totalTraffic, totalTrafficChartData);
            window.tChart.update();

            // Draw doughnut chart for Route-37
            drawDoughnutChart(resp.windowTraffic, route37TrafficChartData, "Route-37");
            window.r37Chart.update();

            // Draw doughnut chart for Route-43
            drawDoughnutChart(resp.windowTraffic, route43TrafficChartData, "Route-43");
            window.r43Chart.update();

            // Draw doughnut chart for Route-82
            drawDoughnutChart(resp.windowTraffic, route82TrafficChartData, "Route-82");
            window.r82Chart.update();
        });
    });
});

function updateTrafficTable(trafficData, routeId, tableElement) {
    var routeOutput = '';
    jQuery.each(trafficData, function (i, vh) {
        if (vh.routeId === routeId) {
            routeOutput += "<tbody><tr><td>" + vh.routeId + "</td><td>" + vh.vehicleType + "</td><td>" + vh.totalCount + "</td></tr></tbody>";
        }
    });
    var tableStart = "<table class='table table-bordered table-condensed table-hover innerTable'><thead><tr><th>Route</th><th>Vehicle</th><th>Count</th></tr></thead>";
    var tableEnd = "</table>";
    tableElement.html(tableStart + routeOutput + tableEnd);
}

function drawBarChart(trafficDetail, trafficChartData) {
    var chartLabel = ["Bus", "Large Truck", "Private Car", "Small Truck", "Taxi"];
    var routeName = ["Route-37", "Route-43", "Route-82"];
    var chartData0 = [0, 0, 0, 0, 0], chartData1 = [0, 0, 0, 0, 0], chartData2 = [0, 0, 0, 0, 0];

    jQuery.each(trafficDetail, function (i, vh) {
        if (vh.routeId === routeName[0]) {
            chartData0.splice(chartLabel.indexOf(vh.vehicleType), 1, vh.totalCount);
        }
        if (vh.routeId === routeName[1]) {
            chartData1.splice(chartLabel.indexOf(vh.vehicleType), 1, vh.totalCount);
        }
        if (vh.routeId === routeName[2]) {
            chartData2.splice(chartLabel.indexOf(vh.vehicleType), 1, vh.totalCount);
        }
    });

    trafficChartData.datasets = [
        {
            label: routeName[0],
            borderColor: "#878BB6",
            backgroundColor: "#878BB6",
            data: chartData0
        },
        {
            label: routeName[1],
            borderColor: "#4ACAB4",
            backgroundColor: "#4ACAB4",
            data: chartData1
        },
        {
            label: routeName[2],
            borderColor: "#FFEA88",
            backgroundColor: "#FFEA88",
            data: chartData2
        }
    ];
    trafficChartData.labels = chartLabel;
}

function drawDoughnutChart(trafficDetail, trafficChartData, routeId) {
    // Prepare data for Doughnut chart
    var chartData = [];
    var chartLabel = [];
    jQuery.each(trafficDetail, function (i, vh) {
        if (vh.routeId == routeId) {
            chartLabel.push(vh.vehicleType);
            chartData.push(vh.totalCount);
        }
    });
    var pieChartData = {
        labels: chartLabel,
        datasets: [{
            backgroundColor: ["#E81574", "#DDE815", "#B315E8", "#e9967a", "#90ee90"],
            data: chartData
        }]
    };

    // Update chart
    trafficChartData.datasets = pieChartData.datasets;
    trafficChartData.labels = pieChartData.labels;
}
