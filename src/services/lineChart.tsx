"use client";
import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartPage = () => {
  const series = [{
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125,30]
  }];

  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: true, // Invertendo o gradiente
        opacityFrom: 0, // Início da opacidade
        opacityTo: 1, // Fim da opacidade
        stops: [0, 90, 100]
      },
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Product Sales',
      align: 'left'
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val).toFixed(0);
        },
      },
      title: {
        text: 'Price'
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val).toFixed(0)
        }
      }
    }
  };

  return (
    <div>
      <h1>Chart Example</h1>
      <Chart options={options} series={series} type="line" height={350} width={760}/>
    </div>
  );
};

export default ChartPage;
