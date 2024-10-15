export type DataSetSchema = {
  filters: Filter[];
  groupings: string[];
  measures: string[];
  dimensions: string[];
}

export type Filter = {
  dimension: string;
  value: string|number; //for now this is just a single value. Need to work out how to handle multiple values in UI. Probs different types for AvailableFilter and ChosenFilter
  //need operator in here. eg <, =, contains etc
}