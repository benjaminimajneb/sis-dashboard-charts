import React, { useState } from "react";
import "react-vis/dist/style.css";
import { useGlobalConfig } from "../GlobalConfigContext";
import ReactECharts from "echarts-for-react";
import BaseChart from "../BaseChart";
import { DataStruct } from "../../types/DataStruct";
import { formatDataForEchartsPieChart } from "../../Utils/transform";
import { Chart } from "../CustomCharts/ChartInterface";
import { clickHandler, getFilterFromEventParams } from "../../Utils/interactions";


const BarChart: Chart = ({ config, initialData }) => {
  const { config: globalConfig, setConfig } = useGlobalConfig();

  const renderBarChart = (data: DataStruct, width: number, height: number) => {

    const options = formatDataForEchartsPieChart(data, config);
    
    const onClick = clickHandler(config, getFilterFromEventParams, globalConfig, setConfig);

    return (
      <ReactECharts option={options} style={{ height, width }} onEvents={{ click: onClick }}/>
    );
  };

  return (
    <BaseChart configSettings={config} initialData={initialData} renderChart={renderBarChart} />
  );
};

export default BarChart;
