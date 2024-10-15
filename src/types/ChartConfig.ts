import { Filter } from "../types/DataSetSchema";

/**
 * This is how we configure each chart. It is the chosen (current) settings
 */
export type ChartConfigOptions = {
  width: number;
  height: number;
  dataset: string;
  sourceUrl: string;
  dimension: string;
  measures: string[];
  grouping?: string;
  filters?: Filter[];
  description?: string; //these might come from dataset, might not
  title?: string; //these might come from dataset, might not
  click?: InteractionEvent;
}

export type GlobalConfigOptions = {
  filters?: Filter[];
  grouping?: string;
  theme: string;
  sourceUrl?: string;
}

export type CombinedConfigOptions = ChartConfigOptions & GlobalConfigOptions;

export type UrlEvent = {
  type: "url";
  url: string;
}

export type FilterEvent = {
  type: "filter";
}

export type InteractionEvent = UrlEvent | FilterEvent;