
(function (H) {
    H.seriesTypes.pie.prototype.animate = function (init) {
        const series = this,
            chart = series.chart,
            points = series.points,
            {
                animation
            } = series.options,
            {
                startAngleRad
            } = series;

        function fanAnimate(point, startAngleRad) {
            const graphic = point.graphic,
                args = point.shapeArgs;

            if (graphic && args) {

                graphic
                    // Set inital animation values
                    .attr({
                        start: startAngleRad,
                        end: startAngleRad,
                        opacity: 1
                    })
                    // Animate to the final position
                    .animate({
                        start: args.start,
                        end: args.end
                    }, {
                        duration: animation.duration / points.length
                    }, function () {
                        // On complete, start animating the next point
                        if (points[point.index + 1]) {
                            fanAnimate(points[point.index + 1], args.end);
                        }
                        // On the last point, fade in the data labels, then
                        // apply the inner size
                        if (point.index === series.points.length - 1) {
                            series.dataLabelsGroup.animate({
                                opacity: 1
                            },
                            void 0,
                            function () {
                                points.forEach(point => {
                                    point.opacity = 1;
                                });
                                series.update({
                                    enableMouseTracking: true
                                }, false);
                                chart.update({
                                    plotOptions: {
                                        pie: {
                                            innerSize: '40%',
                                            borderRadius: 8
                                        }
                                    }
                                });
                            });
                        }
                    });
            }
        }

        if (init) {
            // Hide points on init
            points.forEach(point => {
                point.opacity = 0;
            });
        } else {
            fanAnimate(points[0], startAngleRad);
        }
    };
}(Highcharts));

fetch('jsondata/data.json')
.then(response => response.json())
.then(data => {
    const chartData = [
        { name: 'Others', y: data[1].graph1.other },
        { name: 'Public', y: data[1].graph1.public },
        { name: 'Promoters', y: data[1].graph1.promotors },
        { name: 'FLL', y: data[1].graph1.fll },
        { name: 'MF', y: data[1].graph1.mf }
    ];

    Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text: 'SHAREHOLDING SUMMARY',
            align: 'left'
        },
        tooltip: {
            headerFormat: '',
            pointFormat:
            
                '{point.name} <br>'+' <br><span style="color:{point.color}">\u25cf</span> Holding {point.percentage:.1f}%</b>'
               
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                borderWidth: 2,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
                    distance: 20
                }
            }
        },
        series: [{
            enableMouseTracking: false,
            animation: {
                duration: 2000
            },
            colorByPoint: true,
            data: chartData
        }],
        exporting: {
        enabled: false // Disable download/export options
    },
        credits: {
        enabled: false // This removes the "Highcharts.com" text
    }
    });
})
.catch(error => {
    console.error('Error fetching the JSON data:', error);
});


// graph-2

fetch('jsondata/data.json')
    .then(response => response.json())
    .then(data => {
        // Extract holding and pledges data
        const holdings = Object.values(data[1].graph2.value1);
        const pledges = Object.values(data[1].graph2.value2);

        // Initialize the Highcharts chart
        Highcharts.chart('container-2', {
            chart: {
                type: 'column'
            },
            title: {
                text: '',
                align: 'left'
            },
            subtitle: {
                text: 'HISTORICAL PROMOTION HOLDING',
                align: 'left'
            },
            xAxis: {
                categories: ['Dec 2022', 'Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2023', 'Jun 2024', 'Sep 01, 2024', 'Sep 2024'],
                crosshair: true,
                accessibility: {
                    description: 'Months'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%'
                }
            },
            tooltip: {
                valueSuffix: ' (1000 MT)'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Holding',
                    data: holdings
                },
                {
                    name: 'Pledges as % of Promoter Shares (%)',
                    data: pledges
                }
            ],
            exporting: {
        enabled: false // Disable download/export options
    },
    credits: {
        enabled: false // This removes the "Highcharts.com" text
    }
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

    // graph-3

 fetch('jsondata/data.json')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    // Extract holdings data from the JSON
    const holdings = Object.values(data[1].graph3);

    // Initialize the Highcharts chart
    Highcharts.chart('container-3', {
        chart: {
            type: 'column'
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text: 'HISTORICAL MF HOLDING',
            align: 'left'
        },
        xAxis: {
            categories: [
                'Dec 2022', 'Mar 2023', 'Jun 2023', 'Sep 2023',
                'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 01 2024', 'Sep  2024'
            ],
            crosshair: true,
            title: {
                text: 'Quarter'
            },
            accessibility: {
                description: 'Months'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Holding (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'MF Holding',
                data: holdings
            }
        ],
        exporting: {
            enabled: false // Disable download/export options
        },
        credits: {
            enabled: false // This removes the "Highcharts.com" text
        }
    });
})
.catch(error => console.error('Error fetching the JSON file:', error));

// graph-4
fetch('jsondata/data.json')
.then(response => {
if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
return response.json();
})
.then(data => {
// Extract holdings data from the JSON
const holdings = Object.values(data[1].graph4);

// Initialize the Highcharts chart
Highcharts.chart('container-4', {
    chart: {
        type: 'column'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: 'HISTORICAL FLL HOLDING',
        align: 'left'
    },
    xAxis: {
        categories: [
            'Dec 2022', 'Mar 2023', 'Jun 2023', 'Sep 2023',
            'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 21 2024', 'Sep 2024'
        ],
        crosshair: true,
        title: {
            text: 'Quarter'
        },
        accessibility: {
            description: 'Months'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Holding (%)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'FLL Holding',
            data: holdings,
            color: '#ff69b4' // Set the bar color to pink (Hex color code for pink)
        }
    ],
    exporting: {
        enabled: false // Disable download/export options
    },
    credits: {
        enabled: false // This removes the "Highcharts.com" text
    }
});
})
.catch(error => console.error('Error fetching the JSON file:', error));