import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesPieChart = ({ productsData }) => {
  const options = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: productsData.map(item => item.productName),
    colors: ['#007BFF', '#28A745', '#DC3545', '#FFC107', '#17A2B8'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  const series = productsData.map(item => item.amount);

  return (
    <div className="w-full max-w-md mx-auto">
      <ReactApexChart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default SalesPieChart;