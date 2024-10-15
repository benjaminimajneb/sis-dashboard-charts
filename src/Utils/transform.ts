import { isNumber } from "vega";
import { DataStruct } from "../types/DataStruct";
import { ChartConfigOptions } from "../types/ChartConfig";
import { unStringifyFilter } from "./interactions";
import { Filter } from "../types/DataSetSchema";

/**
 * The implementation of these will be specific to the charting library we are using.
 */
export const formatDataForEchartsLineChart = (data: DataStruct, config: ChartConfigOptions): any => {
    const dataSets = data.dataSets.map((dataSet) => {
        return {
            name: dataSet.dimension,
            type: "line",
            data: dataSet.data.map((dataPoint) => { return { value: dataPoint.measureValue } }),
        };
    });

    //extract the keys from each of the datasets, ensuring they remain in order but we skip any dupliicates
    const xAxisData = Array.from(
        new Set(data.dataSets.map((dataSet) => dataSet.data.map((dataPoint) => dataPoint.dimensionValue)).flat())
    );
    return {
        title: {
            text: config.title ?? data.title,
            left: "center",
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: "category",
            data: xAxisData,
            name: data.dimension
        },
        yAxis: {
            type: "value",
            name: data.measure
        },
        series: dataSets,
    };
}

export const formatDataForEchartsBarChart = (data: DataStruct, config: ChartConfigOptions): any => {
    
    const dataSets = {
        name: data.dimension,
        type: "bar",
        data: data.dataSets.map((dataSet) => { 
            return { 
                //name: dataSet.data[0].dimensionValue,
                value: dataSet.data[0].measureValue 
            }
        }),
    };

    const xAxisData = Array.from(
        new Set(data.dataSets.map((dataSet) => dataSet.data.map((dataPoint) => dataPoint.dimensionValue)).flat())
    );
    
    return {
        title: {
            text: config.title ?? data.title,
            left: "center",
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: "category",
            data: xAxisData,
            name: data.dimension
        },
        yAxis: {
            type: "value",
            name: data.measure
        },
        series: dataSets,
    };
}

export const formatDataForEchartsPieChart = (data: DataStruct, config: ChartConfigOptions): any => {

    const values = data.dataSets[0].data.map((dataPoint) => dataPoint.measureValue);

    const total = data.dataSets.reduce((acc, dataSet) => acc + (isNumber(dataSet.data[0].measureValue) ? dataSet.data[0].measureValue : parseInt(dataSet.data[0].measureValue)), 0);

    const dataSet = data.dataSets.map((dataSet) => {
        return {
            name: dataSet.data[0].dimensionValue,
            value: (isNumber(dataSet.data[0].measureValue) ? dataSet.data[0].measureValue : parseInt(dataSet.data[0].measureValue)) / total * 100,
            filter: { dimension: data.dimension, value: dataSet.data[0].dimensionValue }
        };
    });

    return {
        title: {
            text: config.title ?? data.title,
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            bottom: "0%",
        },
        series: [
            {
                data: dataSet,
                name: data.dataSets[0].dimension,
                type: "pie",
                radius: "50%",
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };

}

