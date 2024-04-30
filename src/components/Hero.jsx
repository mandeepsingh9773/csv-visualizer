import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import {
  ArrowDownWideNarrow,
  // Upload,
  Search,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
} from "lucide-react";
import Papa from "papaparse";

const Hero = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [numericColumns, setNumericColumns] = useState([]);
  const [selectedStringColumn, setSelectedStringColumn] = useState("");
  const [stringColumns, setStringColumns] = useState([]);

  useEffect(() => {
    // Filter numeric columns when csvData changes
    const newNumericColumns = Object.keys(csvData[0] || {}).filter((col) =>
      csvData.every((row) => !isNaN(parseFloat(row[col])))
    );
    setNumericColumns(newNumericColumns);
    const newStringColumns = Object.keys(csvData[0] || {}).filter(
      (col) =>
        !newNumericColumns.includes(col) &&
        csvData.every((row) => typeof row[col] === "string")
    );
    setStringColumns(newStringColumns);
  }, [csvData]);

  const navLinks = [
    {
      name: "Board",
      icon: LayoutDashboard,
    },
    {
      name: "Filter",
      icon: ArrowDownWideNarrow,
    },
    {
      name: "Activity",
      icon: Clock4Icon,
    }
  ];

  const handleStringColumnSelect = (event) => {
    setSelectedStringColumn(event.target.value);
    const selectedColumn = event.target.value;
    const chartData = csvData.map((row) => row[selectedColumn]);
    const labels = [...new Set(chartData)]; // Extract unique values for labels
    const series = labels.map((label) => {
      const count = chartData.filter((value) => value === label).length;
      return count;
    });

    setDonutChartOptions((prevOptions) => ({
      ...prevOptions,
      series: series,
      options: {
        ...prevOptions.options,
        labels: labels,
      },
    }));
  };

  const handleColumnSelect = (event) => {
    const selectedColumn = event.target.value;
    setSelectedColumn(selectedColumn);
    const chartData = csvData.map((row) => row[selectedColumn]);
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: chartData,
        },
      ],
    }));
  };

  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: "category",
      },
    },
  });

  const [donutChartOptions, setDonutChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
      },
      labels: [],
    },
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    console.log("Selected file:", file);

    Papa.parse(file, {
      download: true,
      header: true,
      complete: (results) => {
        const data = results.data;
        const filteredData = data.slice(0, 15);
        const chartData = filteredData.map((row) => row["Item_Weight"]); // Replace 'Column Name' with your desired column name
        const categories = filteredData.map((row) => row["Item_Identifier"]); // Replace 'Category Column' with your category column name

        setChartOptions({
          series: [
            {
              name: "Data Series",
              data: chartData,
            },
          ],
          options: {
            chart: {
              type: "bar",
            },
            xaxis: {
              categories: categories,
              type: "category",
            },
          },
        });
        setCsvData(filteredData);

        if (filteredData.length > 0) {
          const firstColumn = Object.keys(filteredData[0])[0]; //To Select the first column by default
          setSelectedStringColumn(firstColumn);
          const donutChartData = filteredData.map((row) => row[firstColumn]);
          const labels = [...new Set(donutChartData)]; // Extracting unique values for labels
          const series = labels.map((label) => {
            const count = donutChartData.filter(
              (value) => value === label
            ).length;
            return count;
          });
          setDonutChartOptions((prevOptions) => ({
            ...prevOptions,
            series: series,
            options: {
              ...prevOptions.options,
              labels: labels,
            },
          }));
        }
        console.log(filteredData);
      },
    });
  };

  return (
    <>
      {/* <div className="searchbar font-custom1 mx-auto relative bg-white min-w-sm max-w-3xl flex flex-row md:flex-row items-center justify-center border py-2 px-2 rounded-lg gap-2 shadow-xl focus-within:border-gray-300">
        <button
          className="bg-white text-white fill-white active:scale-95 rounded-full"
        >
          <Search color="black" className="size-6 ml-4" />
        </button>
        <input
          id="search-bar"
          placeholder="Search"
          className="px-2 py-2 w-full rounded-md flex-1 outline-none bg-white"
        />
        <button className="hover:cursor-pointer active:scale-95 overflow-hidden flex items-center">
        </button>
      </div> */}
      <div className="uploadbar font-custom1 flex justify-center pt-8">
        <input className="border" type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <div className="dropdown font-custom1 flex justify-center pt-8 gap-x-6">
        <div className="bar-chart">
          <label htmlFor="yAxis" className="text-lg pr-4">
            Create BarChart :{" "}
          </label>
          <select
            className="border border-zinc-950 rounded-lg"
            value={selectedColumn}
            onChange={handleColumnSelect}
          >
            <option value="">Select a column</option>
            {csvData.length > 0 &&
              numericColumns.map((columnName) => (
                <option key={columnName} value={columnName}>
                  {columnName}
                </option>
              ))}
          </select>
        </div>
        <div className="donut-chart">
          <label htmlFor="xAxis" className="text-lg pr-4">
            Create DonutChart :{" "}
          </label>
          <select
            className="border border-zinc-950 rounded-lg"
            value={selectedStringColumn}
            onChange={handleStringColumnSelect}
          >
            <option value="">Select a column</option>
            {csvData.length > 0 &&
              stringColumns.map((columnName) => (
                <option key={columnName} value={columnName}>
                  {columnName}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex font-custom1">
        <div className="sideBar w-auto h-full flex flex-col border border-r-1 rounded-xl shadow-xl items-left pl-4 pr-2 py-8 ml-8 mt-8">
          <div className="flex flex-col space-y-8">
            {navLinks.map((items, index) => (
              <div
                key={index}
                className="flex space-x-2 active:scale-95 hover:cursor-pointer"
              >
                <items.icon />
                <span>{items.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chartarea w-full border border-r-1 rounded-xl shadow-xl flex flex-col py-8 px-8 ml-8 mt-8 mr-8">
          {csvData.length > 0 ? (
            <div className="grid grid-cols-2">
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="bar"
                width="600"
              />
              <Chart
                options={donutChartOptions.options}
                series={donutChartOptions.series}
                type="donut"
                width="600"
              />
            </div>
          ) : (
            <div className="flex"> Upload a .csv file !</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
