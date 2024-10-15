export type Filter = {
  dimension: string;
  operator: string;
  values: string[];
}

export type TimeDimension = {
  dimension: string;
  granularity: string;
  dateRange?: string[]; //this can be a text like 'last year' or startdate and enddate
}

export type Query = {
  dimensions: string[];
  measures: string[];
  filters: Filter[];
  timeDimensions: TimeDimension[];
}