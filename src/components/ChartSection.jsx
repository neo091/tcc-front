import React from 'react';
import Chart from "react-apexcharts";
import { Card, CardTitle } from './Card';
import Exam from './Exam';


const ChartSection = () => {

    const state = {
        options: {
            chart: {
                width: "100%",
                // height: 350,
                background: "none",
                foreColor: "#999999",
                // redrawOnParentResize: true,
                zoom: {
                    enabled: false
                },
                sparkline: {
                    enabled: false // this is either display the lines
                },
                toolbar: {
                    show: false
                }
            },
            stroke: {
                show: false,
                curve: "straight"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
            fill: {
                colors: ['#1A73E8', '#B32824'],
                opacity: 1,
                type: "solid",
                pattern: {
                    style: 'verticalLines',
                    width: 2,
                    height: 6,
                    strokeWidth: 1,
                }

            },
            labels: ['A', 'B', 'C', 'D', 'E']
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    }
    const lineState = {
        options: {
            colors: ['#3C50E0', '#80CAEE'],
            chart: {
                type: 'line',
                width: "80%",
                //height: 350,
                background: "none",
                foreColor: "#999999",
                redrawOnParentResize: true,
                zoom: {
                    enabled: false
                },
                sparkline: {
                    enabled: true // this is either display the lines
                },
                toolbar: {
                    show: false
                }
            },

        },
        series: [
            {
                name: 'Area 1',
                type: 'area',
                data: [10, 20, 55, 30]
            },
            {
                name: 'Area 2',
                type: 'area',
                data: [30, 40, 25, 10]
            }
        ]
    }
    const donutState = {
        options: {
            colors: ['#3C50E0', '#80CAEE', '#6577F3'],
            labels: ['A', 'B', 'C'],
            chart: {
                type: 'donut',
                background: "none",
                foreColor: "#999999",
            },
            stroke: {
                show: false
            },
            legend: {
                position: 'bottom',
            }
        },
        series: [30, 55, 41]
    }

    const barState = {
        options: {
            colors: ['#3C50E0', '#80CAEE'],
            chart: {
                type: 'bar',
                stacked: true,
                width: "100%",
                height: '200px',
                background: "none",
                foreColor: "#999999",
                // redrawOnParentResize: true,
                zoom: {
                    enabled: false
                },
                sparkline: {
                    enabled: false // this is either display the lines
                },
                toolbar: {
                    show: false
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    columnWidth: '30',
                    dataLabels: {
                        show: false
                    },
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                    '01/05/2011 GMT', '01/06/2011 GMT', '01/07/2011 GMT'
                ],
            },
            legend: {
                show: false
            },
            fill: {
                opacity: 1
            },
            grid: {
                strokeDashArray: 5,
                borderColor: '#999',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            }

        },
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43, 5]
        }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27, 10]
        }],

    };

    var LineOptions = {
        theme: {
            mode: 'dark',
            palette: 'palette1',
        },
        series: [{
            name: 'Aula 1',
            data: [31, 40, 28, 51, 42, 119]
        }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52]
        }],
        chart: {
            type: 'area',
            background: "none",
            foreColor: "#999999",
            with: '100%',
            //height: '100%',
            //redrawOnParentResize: true,
            zoom: {
                enabled: false
            },
            // sparkline: {
            //     enabled: true // this is either display the lines
            // },
            toolbar: {
                show: false
            }
        },
        legend: {
            show: true,
            markers: {
                size: 7,
                shape: undefined,
                strokeWidth: 1,
                fillColors: undefined,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        }


    };

    const optionsBars = {
        dataLabels: {
            enabled: false
        },
        theme: {
            mode: 'dark',
            palette: 'palette2',
        },
        chart: {
            type: 'bar',
            stacked: true,
            background: "none",
            foreColor: "#999999",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '20%',
                horizontal: false,
            },
        },
        series: [{
            name: 'Aula 1',
            data: [14, 25, 21, 17, 3, 2, 21]
        }, {
            name: 'Aula 2',
            data: [13, 23, 20, 8, 13, 23, 10]
        }],
        xaxis: {
            categories: ['A', 'S', 'O', 'N', 'D', 'E', 'F'],
        },

        fill: {
            opacity: 1
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        }
    }

    return (
        <div className="grid grid-cols-12 gap-6 ">
            <Card extraCss={'col-span-12 xl:col-span-9'}>
                <div className='p-2'>
                    <CardTitle>Promedio de Aprendizaje</CardTitle>
                    <div className='h-[392px]'>
                        <Chart options={LineOptions} series={LineOptions.series} type="area" height='392px' />
                    </div>

                </div>
            </Card>

            <Card extraCss={'col-span-12 xl:col-span-3'}>
                <div className='p-2'>
                    <CardTitle>Promedio General</CardTitle>
                    <div className='h-[392px]'>
                        <Chart options={optionsBars} series={optionsBars.series} type="bar" height="392px" />
                    </div>
                </div>
            </Card>
            <Card extraCss={'col-span-12 xl:col-span-4'}>
                <div className='p-2'>
                    <CardTitle>Exámenes Generados</CardTitle>
                    <div className='min-h-[392px]'>
                        <Chart options={donutState.options} series={donutState.series} type="donut" height="392px" />
                    </div>

                </div>
            </Card>

            <Card extraCss={'col-span-12 xl:col-span-8'}>
                <div className='p-6'>
                    <CardTitle>Lista Exámenes Generados</CardTitle>

                    <Exam />

                </div>
            </Card>
        </div>
    );
}

export default ChartSection;
