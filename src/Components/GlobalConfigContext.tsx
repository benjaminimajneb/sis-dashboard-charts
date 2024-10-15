import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { GlobalConfigOptions, ChartConfigOptions } from "../types/ChartConfig";
import { DataSetSchema, Filter  } from "../types/DataSetSchema";

type GlobalConfigContextProps = {
  registerAvailableOptions: (options: DataSetSchema) => void;
  availableOptions: DataSetSchema;
  config: GlobalConfigOptions;
  setConfig: (config: GlobalConfigOptions) => void;
  registerChartConfig: (config: ChartConfigOptions) => void;
  chartConfigs: ChartConfigOptions[];
  updateChartConfigs: (config: GlobalConfigOptions) => void;
}

const GlobalConfigContext = createContext<GlobalConfigContextProps | undefined>(undefined);

type GlobalConfigProviderProps = {
  children: ReactNode;
  initialConfig?: GlobalConfigOptions;
}

export const GlobalConfigProvider: React.FC<GlobalConfigProviderProps> = ({ children, initialConfig }) => {
  const [config, setConfig] = useState<GlobalConfigOptions>(initialConfig ?? { theme: "light" });
  const [chartConfigs, setChartConfigs] = useState<ChartConfigOptions[]>([]);
  const [availableOptions, setAvailableOptions] = useState<DataSetSchema>({
    filters: [],
    groupings: [],
    measures: [],
    dimensions: []
  });

  // a better approach here will be to keep a list of schemas, and then reduce the list each time it changes.
  // we really need a way of doing this by id as well, since this change might require removing as well as adding.
  const registerAvailableOptions = (options: DataSetSchema) => {
    setAvailableOptions({
      filters: availableOptions.filters.length === 0 ? options.filters : availableOptions.filters.filter(f => options.filters.includes(f)),
      groupings: availableOptions.groupings.length === 0 ? options.groupings : availableOptions.groupings.filter(g => options.groupings.includes(g)),
      measures: availableOptions.measures.length === 0 ? options.measures : availableOptions.measures.filter(m => options.measures.includes(m)),
      dimensions: availableOptions.dimensions.length === 0 ? options.dimensions : availableOptions.dimensions.filter(d => options.dimensions.includes(d)),
    });
  };

  //keep a list of each chart's current settings.
  const registerChartConfig = (chartConfig: ChartConfigOptions) => {
    setChartConfigs([...chartConfigs, chartConfig]);
  };
  
  const updateChartConfigs = (newConfig: GlobalConfigOptions) => {
    setChartConfigs(
      chartConfigs.map((config) => ({
        ...config,
        filters: newConfig.filters,
        grouping: newConfig.grouping,
      }))
    );
  };

  useEffect(() => {
    console.log('global config saved', config)
  }, [config]);

  return (
    <GlobalConfigContext.Provider value={{ config, setConfig, registerChartConfig, registerAvailableOptions, availableOptions,chartConfigs, updateChartConfigs }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = (): GlobalConfigContextProps => {
  const context = useContext(GlobalConfigContext);
  if (!context) {
    throw new Error("useGlobalConfig must be used within a GlobalConfigProvider");
  }
  return context;
};