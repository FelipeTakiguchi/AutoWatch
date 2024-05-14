"use client";
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import useClientStore from '../../services/clientStore';
import "./styles.sass";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartPage = () => {
  const { impactData } = useClientStore();
  const series = [{
    name: 'Acceleration',
    data: impactData.data.map(item => item.acceleration),
  }];

  const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.6); // Initial height
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8); // Initial width

  // Update chart dimensions on window resize
  useEffect(() => {
    function handleResize() {
      setChartHeight(window.innerHeight * 0.6); // Set height as 60% of window height
      setChartWidth(window.innerWidth * 0.8); // Set width as 80% of window width
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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
    <div className="chart">
      <Chart options={options} series={series} type="line" height={chartHeight} width={chartWidth} />
    </div>
  );
};

export default ChartPage;
