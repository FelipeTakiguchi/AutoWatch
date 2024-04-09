"use client";
import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from "next/dynamic";
import useClientStore from './store';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartPage = () => {
  const { impactData } = useClientStore();
  const series = [{
    name: 'Acceleration',
    data: impactData.data.map(item => item.acceleration),
  }];

  console.log(impactData);

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
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 90, 100]
      },
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Aceleração x Tempo',
      align: 'left'
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(1);
        },
      },
      title: {
        text: 'Aceleração em G (s)'
      },
    },
    xaxis: {
      tickAmount: 10,
      categories: impactData.data.map(item => {
        const date = new Date(new Date(impactData.arising).getTime() - (impactData.data[impactData.data.length - 1].time - item.time));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
      }),
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(3)
        }
      }
    }
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} width={760} />
    </div>
  );
};

export default ChartPage;
