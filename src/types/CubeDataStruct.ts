import { valueArray } from "vega-lite/build/src/channeldef";
import { Dimension } from "./CubeDataSetSchema";
import { Query } from "./CubeQueryStruct";

export type DataStruct = {
  data: Data[];
  query: Query;
  lastRefreshTime: string;
}

export type Data = {
  dimension: string;
  data: DataPoint[];
  refreshDateTime: string;
}

{ 
    dimension1: value
    dimension2: value
}


export type Filter = {
    dimension: string;
    operator: string;
    values: string[];
}
  
export type TimeDimension = {
    dimension: string;
    granularity: string;
    dateRange?: string[];
}