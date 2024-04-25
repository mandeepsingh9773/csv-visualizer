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

  useEffect(() => {
    // Filter numeric columns when csvData changes
    const newNumericColumns = Object.keys(csvData[0] || {}).filter((col) =>
      csvData.every((row) => !isNaN(parseFloat(row[col])))
    );
    setNumericColumns(newNumericColumns);
  }, [csvData]);

  const navLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Filter",
      icon: ArrowDownWideNarrow,
    },
    {
      name: "Activity",
      icon: Clock4Icon,
    },
    {
      name: "Analytics",
      icon: BarChart3Icon,
    },
    {
      name: "Get Help",
      icon: HelpCircleIcon,
    },
  ];

  const handleColumnSelect = (event) => {
    const selectedColumn = event.target.value;
    setSelectedColumn(selectedColumn);

    // Update chart options based on selected column
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
        name: "Data Series",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        type: "category",
      },
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
              type: "line",
            },
            xaxis: {
              categories: categories,
              type: "category",
            },
          },
        });
        setCsvData(filteredData);
        console.log(filteredData);
      },
    });
  };

  return (
    <>
      <div className="searchbar font-custom1 mx-auto relative bg-white min-w-sm max-w-3xl flex flex-row md:flex-row items-center justify-center border py-2 px-2 rounded-lg gap-2 shadow-xl focus-within:border-gray-300">
        <button
          // onClick={generateAnswer}
          className="bg-white text-white fill-white active:scale-95 rounded-full"
        >
          <Search color="black" className="size-6 ml-4" />
        </button>
        <input
          // value={question}
          // onChange={(e) => setQuestion(e.target.value)}
          id="search-bar"
          placeholder="Search"
          className="px-2 py-2 w-full rounded-md flex-1 outline-none bg-white"
        />
        <button className="hover:cursor-pointer active:scale-95 overflow-hidden flex items-center">
          {/* <Upload color="black" className="size-6 mr-2" /> */}
        </button>
      </div>
      <div className="uploadbar flex justify-center pt-8">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <div className="dropdown flex justify-center pt-8 gap-x-6">
        <div className="yAxis">
          <label htmlFor="yAxis" className="text-lg pr-4">
            Y-axis :{" "}
          </label>
          <select
            className="border border-zinc-950"
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
          <div className="grid grid-cols-2">
            {csvData.length > 0 ? (
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="bar"
                width="800"
              />
            ) : (
              <div className="flex"> Upload a csv file !</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
