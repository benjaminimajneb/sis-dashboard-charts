import React, { useState, useEffect } from "react";
import { GlobalConfigOptions } from "../types/ChartConfig";
import { DataSetSchema, Filter  } from "../types/DataSetSchema";
import { useGlobalConfig } from "./GlobalConfigContext";
import { stringifyFilter, unStringifyFilter } from "../Utils/interactions";

const GlobalConfig: React.FC = () => {

  const { config, setConfig, availableOptions, updateChartConfigs } = useGlobalConfig();
  const [localConfig, setLocalConfig] = useState<GlobalConfigOptions>(config);
  const [options, setOptions] = useState<DataSetSchema>(availableOptions);

  const handleSave = () => {
    setConfig(localConfig);
    //updateChartConfigs(localConfig);
  };

  useEffect(() => {
    handleSave();
  }, [localConfig])
  
  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  useEffect(() => {
    setOptions(availableOptions);
  }, [availableOptions]);

  const handleChange = (key: keyof GlobalConfigOptions, value: any) => {
    setLocalConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };
  
  const handleFilters = (filters: string[]) => {
    // need to turn html strings back into filter object
    const newFilters = filters.map(unStringifyFilter);
    setLocalConfig((prevConfig) => ({
      ...prevConfig,
      filters: newFilters,
    }));
  }

  return (
    <div className="global-config-box">
      <div className="global-config">
        <label>
          Theme:
          <select value={localConfig.theme} onChange={(e) => handleChange("theme", e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <br />
        <label>
          Common Filters:
          <select
            multiple
            value={localConfig.filters?.map(stringifyFilter)}
            onChange={(e) => handleFilters(Array.from(e.target.selectedOptions, (option) => option.value))  }
          >
            {options.filters?.map((filter) => (
              <option key={filter.dimension} value={filter.value}>
                { stringifyFilter(filter) }
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Common Groupings:
          <select value={localConfig.grouping} onChange={(e) => handleChange("grouping", e.target.value)}>
            <option value="">Select Grouping</option>
            {options.groupings?.map((grouping) => (
              <option key={grouping} value={grouping}>
                {grouping}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default GlobalConfig;
