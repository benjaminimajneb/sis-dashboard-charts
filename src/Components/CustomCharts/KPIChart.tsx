import React from "react";
import BaseChart from "../BaseChart";
import { DataStruct } from "../../types/DataStruct";
import { Chart } from "../CustomCharts/ChartInterface";

const KPIChart: Chart = ({ config, initialData }) => {

    const renderKPIChart = (data: DataStruct, width: number, height: number) => {
        if (!data || !data.dataSets || data.dataSets.length === 0) {
            return <div>No data available</div>;
        }
        return (
            <div className="chart-widget" style={{ height, width }}>
              <div className="chart-header">
                    <h3>{config.title ?? data.title}</h3>
                    {((config.description || data.description) && <p>{config.description || data.description}</p>)}
                </div>
                <div className="kpi-value">
                    <h1>{data.dataSets[0].data[0].measureValue}</h1>
                </div>
            </div>
        );
    };

    return (
        <BaseChart configSettings={config} initialData={initialData} renderChart={renderKPIChart} />
    );
};

export default KPIChart;