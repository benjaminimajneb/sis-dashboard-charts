import { Filter } from "../types/DataSetSchema";

/**
 * This is the interface for ALL data coming into the system (from API/sis etc)
 */
export type DataStruct = {
  sourceUrl: string; //is this required? surely it is part of configs.
  dataSets: DataSet[];
  title: string;
  description?: string;
  measure: string;
  dimension: string; //this potentially does not live here.
  grouping?: string;
  filters?: Filter[];
}

export type DataSet = {
  dimension: string;
  data: DataPoint[];
  refreshDateTime: string;
}

export type DataPoint = {
  dimensionValue: string; //ie x axis
  measureValue: string|number; // ie y axis - THIS SHOULD BE VALUE
}