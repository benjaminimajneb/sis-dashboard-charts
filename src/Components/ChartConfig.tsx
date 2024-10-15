import React, { useState, useEffect } from "react";
import { ChartConfigOptions } from "../types/ChartConfig";
import { useGlobalConfig } from "./GlobalConfigContext";
import { DataSetSchema, Filter } from "../types/DataSetSchema";
import { getDataSetSchema } from "../Utils/fetchData";
import { stringifyFilter, unStringifyFilter } from "../Utils/interactions";
import { isEqual } from 'lodash';

type ChartConfigProps = {
  onSizeChange: (width: number, height: number) => void;
  onConfigSave: (config: ChartConfigOptions) => void;
  selectedConfig: ChartConfigOptions;
  showDataSetOption?: boolean;
}

const ChartConfig: React.FC<ChartConfigProps> = ({
  onSizeChange,
  onConfigSave,
  selectedConfig,
  showDataSetOption = false,
}) => {
  const { config: globalConfig, setConfig: setGlobalConfig } = useGlobalConfig();
  const [width, setWidth] = useState<number>(selectedConfig.width);
  const [height, setHeight] = useState<number>(selectedConfig.height);
  const [filters, setFilters] = useState<Filter[]>(selectedConfig.filters || []);
  const [grouping, setGrouping] = useState<string>(selectedConfig.grouping || "");
  const [dataset, setDataset] = useState<string>(selectedConfig.dataset);
  const [syncWithGlobalConfig, setSyncWithGlobalConfig] = useState<boolean>(false);
  const [availableConfig, setAvailableConfig] = useState<DataSetSchema | null>(null);

  
  useEffect(() => {
    const fetchSchema = async () => {
      const schema = await getDataSetSchema(selectedConfig);
      setAvailableConfig(schema);
    };
    fetchSchema();
  }, [dataset]);

  useEffect(() => {
    onSizeChange(width, height);
  }, [height, width]);

  const availableFilters = availableConfig?.filters;
  const availableGroupings = availableConfig?.groupings;

  const handleConfigSave = () => {
    const newConfig = { ...selectedConfig, width, height, dataset, filters, grouping };
    // pass back to chart to recalc data.
    onConfigSave(newConfig);
    if (syncWithGlobalConfig) {
      // also change global settings.
      setGlobalConfig({ ...globalConfig, filters, grouping });
    }
  };

  useEffect(() => {
    handleConfigSave();
  }, [dataset, filters, grouping]);

  const handleFilters = (filters: string[]) => {
    // need to turn HTML strings back into filter object
    const newFilters = filters.map(unStringifyFilter);
    setFilters(newFilters);
  }

  return (
    <div className="chart-config">
      <label>
        Width:
        <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} />
      </label>
      <br />
      <label>
        Height:
        <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />
      </label>
      <br />
      {showDataSetOption && (
        <label>
          Dataset:
          <select value={dataset} onChange={(e) => setDataset(e.target.value)}>
            <option value="behaviour">Behaviour</option>
            <option value="attendance">Attendance</option>
          </select>
        </label>
      )}
      <br />
      <label>
        Filters:
        <select
          multiple
          value={filters.map(stringifyFilter)}
          onChange={(e) => handleFilters(Array.from(e.target.selectedOptions, (option) => option.value))  }
        >
          {availableFilters?.map((filter) => (
            <option key={filter.dimension} value={filter.value}>
              {stringifyFilter(filter)}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Groupings:
        <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
        <option key='' value=''> All </option>
          {availableGroupings?.map((grouping) => (
            <option key={grouping} value={grouping}>
              {grouping}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Sync with Global Config:
        <input type="checkbox" checked={syncWithGlobalConfig} onChange={(e) => setSyncWithGlobalConfig(e.target.checked)} />
      </label>
      <br />
    </div>
  );
};

export default ChartConfig;
