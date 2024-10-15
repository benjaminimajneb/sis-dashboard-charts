import React, { useState } from "react";
import "react-vis/dist/style.css";
import { CombinedConfigOptions } from "../../types/ChartConfig";
import ReactECharts from "echarts-for-react";
import BaseChart from "../BaseChart";
import { DataStruct } from "../../types/DataStruct";
import { formatDataForEchartsLineChart } from "../../Utils/transform";
import { Chart } from "../CustomCharts/ChartInterface";


const BarChart: Chart = ({ config, initialData }) => {

  const renderBarChart = (data: DataStruct, width: number, height: number) => {
    
    const options = formatDataForEchartsLineChart(data, config);

    return (
      <ReactECharts option={options} style={{ height, width }} />
    );
  };

  return (
    <BaseChart configSettings={config} initialData={initialData} renderChart={renderBarChart} />
  );
};

export default BarChart;
