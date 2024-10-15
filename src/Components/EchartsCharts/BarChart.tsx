import ReactECharts from "echarts-for-react";
import BaseChart from "../BaseChart";
import { DataStruct } from "../../types/DataStruct";
import { formatDataForEchartsBarChart } from "../../Utils/transform";
import { Chart } from "../CustomCharts/ChartInterface";
import { clickHandler, getFilterFromEventParams } from "../../Utils/interactions";
import { useGlobalConfig } from "../GlobalConfigContext";


const BarChart: Chart = ({ config, initialData }) => {

  const { config: globalConfig, setConfig } = useGlobalConfig();

  const renderBarChart = (data: DataStruct, width: number, height: number) => {
    const options = formatDataForEchartsBarChart(data, config);

    const onBarClick = clickHandler(config, getFilterFromEventParams, globalConfig, setConfig);

    return (
      <ReactECharts option={options} style={{ height, width }} onEvents={{ click: onBarClick }} />
    );
  };

  return (
    <BaseChart configSettings={config} initialData={initialData} renderChart={renderBarChart} />
  );
};

export default BarChart;
