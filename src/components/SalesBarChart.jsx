import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesBarChart = ({ salesData }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: salesData.map(item => item.month),
    },
    yaxis: {
      title: {
        text: 'Sales',
      },
    },
    colors: ['#007BFF'],
  };

  const series = [{
    name: 'Sales',
    data: salesData.map(item => item.amount),
  }];

  return (
    <div className="w-full max-w-md mx-auto">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default SalesBarChart;