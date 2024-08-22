
import { ArchiveBoxIcon, DocumentTextIcon, PresentationChartBarIcon, UserIcon } from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";

const TeacherHome = () => {


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
    const donutstate = {
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
            palette: 'palette2',
        },
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 119, 100]
        }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
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
            sparkline: {
                enabled: true // this is either display the lines
            },
            toolbar: {
                show: false
            }
        },
        legend: {
            show: false,
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
            //height: 280,
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
        <>
            <div className="mx-6 flex flex-col gap-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className=" bg-slate-800 p-6">

                        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                            <UserIcon className="w-6 h-6" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className=" text-3xl font-bold text-black dark:text-white">95</h4>
                                <span className="text-xs text-slate-400">Alumnos</span>
                            </div>

                        </div>



                    </div>

                    <div className=" bg-slate-800 p-6">

                        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                            <PresentationChartBarIcon className="w-6 h-6" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className=" text-3xl font-bold text-black dark:text-white">4</h4>
                                <span className="text-xs text-slate-400">Aulas Virtuales</span>
                            </div>

                        </div>



                    </div>

                    <div className=" bg-slate-800 p-6">

                        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                            <ArchiveBoxIcon className="w-6 h-6" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className=" text-3xl font-bold text-black dark:text-white">10</h4>
                                <span className="text-xs text-slate-400">Archivos</span>
                            </div>

                        </div>



                    </div>

                    <div className=" bg-slate-800 p-6">

                        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                            <DocumentTextIcon className="w-6 h-6" />
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <h4 className=" text-3xl font-bold text-black dark:text-white">5</h4>
                                <span className="text-xs text-slate-400">Exámenes Pendientes</span>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="grid md:grid-cols-6 gap-6 ">
                    <div className=" bg-slate-800 col-span-2 p-4">
                        <div className="min-h-60">
                            <div>
                                <h2 className="text-2xl font-bold">Promedio de Aprendizaje</h2>
                            </div>

                            <Chart options={optionsBars} series={optionsBars.series} type="bar" />
                        </div>
                    </div>

                    <div className=" bg-slate-800 col-span-2 p-4">
                        <div className="min-h-60">
                            <div>
                                <h2 className="text-2xl font-bold">Exámenes Generados</h2>
                            </div>

                            <Chart options={donutstate.options} series={donutstate.series} type="donut" />
                        </div>
                    </div>

                    <div className=" bg-slate-800 col-span-2 p-4">

                        <div>
                            <h2 className="text-2xl font-bold">Promedio de Aprendizaje</h2>
                        </div>

                        <Chart options={LineOptions} series={LineOptions.series} type="area" />
                    </div>


                </div>


            </div>
        </>
    );
}

export default TeacherHome;