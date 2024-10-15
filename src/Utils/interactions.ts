import { ChartConfigOptions } from "../types/ChartConfig";
import { Filter } from "../types/DataSetSchema";
import { GlobalConfigOptions } from "../types/ChartConfig";

export const stringifyFilter = (filter: Filter): string => `${filter.dimension}: ${filter.value}`
export const unStringifyFilter = (stringFilter: string): Filter => {  
  const [dimension, value] = stringFilter.split(": ");  return { dimension, value };
}

const applyFilter = (
  filter: Filter,
  globalConfigs: GlobalConfigOptions,
  setGlobalConfigs: Function
) => {
  const updatedFilters = globalConfigs.filters ? [...globalConfigs.filters, filter] : [filter];
  setGlobalConfigs({ ...globalConfigs, filters: updatedFilters });
};


export const clickHandler = <T>(
  config: ChartConfigOptions,
  filterResolver: (config: ChartConfigOptions, params: T) => Filter,
  globalConfigs: GlobalConfigOptions,
  setGlobalConfigs: Function
): (params: T) => void => {
  return (params: T) => {
    if (!config.click) return;
    const filter = filterResolver(config, params);
    if (config.click.type === 'filter' ) {
      return applyFilter(filter, globalConfigs, setGlobalConfigs);
    }    

    if (config.click.type === 'url') {
      return loadUrl(generateUrl(config.click.url, config));
    }
  }
}

export const generateUrl = (url: string, config: ChartConfigOptions): string => {
  const baseUrl = url;
  const params = new URLSearchParams({
    dataSource: config.dataset,
    dimension: config.dimension,
  });

  if (config.filters) {
    config.filters.forEach(filter => params.append("filters[]", stringifyFilter(filter)));
  }
  config.measures.forEach(measure => params.append("measures[]", measure));
  if (config.grouping) {
    params.append("grouping", config.grouping);
  }
  return `${baseUrl}?${params.toString()}`;
};

export const loadUrl = (url: string) => {
  window.location.href = url;
};

export const getFilterFromEventParams = (config: ChartConfigOptions, params: any): Filter => {
  return {
    dimension: config.dimension,
    value: params.name,
  };
}