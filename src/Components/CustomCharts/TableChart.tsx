import React from "react";
import { DataStruct, DataPoint } from "../../types/DataStruct";
import { Chart } from "./ChartInterface";
import BaseChart from "../BaseChart";

const TableChart: Chart = ({ config, initialData }) => {

    const renderBarChart = (data: DataStruct, width: number, height: number) => {
        if (!data || !data.dataSets || data.dataSets.length === 0) {
            return <div>No data available</div>;
        }
        /**
         * This should be in a transform function really.
         * Every dataSet is a row
         * also this is on the assumption that all the required headers will be in the first row. Bit scketchy
         */
        
        //this is a big fudge to get data into right shape. There should/could be more measures?:
        const headers = [data.measure]
        return (
            <div className="chart-widget">
                <div className="chart-header">
                    <h3>{config.title ?? data.title}</h3>
                    {((config.description || data.description) && <p>{config.description || data.description}</p>)}
                </div>
                <div className="table-chart-widget">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th key={data.grouping || data.dimension}> {data.grouping || data.dimension} </th>
                                {headers.map((header) => (
                                    <th key={header}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(data.dataSets.map((rowData) =>
                                <tr key={rowData.data[0].dimensionValue}>
                                    <td key={data.grouping || ''}>{rowData.data[0].dimensionValue}</td>
                                    {rowData.data.map((datum: DataPoint) => (
                                        <td key={datum.dimensionValue}>{datum.measureValue}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <BaseChart configSettings={config} initialData={initialData} renderChart={renderBarChart} />
    );
};


export default TableChart;