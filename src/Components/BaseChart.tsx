import React, { useState, useEffect } from "react";
import ChartConfig from "./ChartConfig";
import { CombinedConfigOptions, ChartConfigOptions } from "../types/ChartConfig";
import { fetchData } from "../Utils/fetchData";
import { getDataSetSchema } from "../Utils/fetchData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { DataStruct } from "../types/DataStruct";
import { getRefreshDateTime } from "../Utils/refreshDateTime";
import { useGlobalConfig } from "./GlobalConfigContext";
import { isEqual } from 'lodash';

type ChartProps = {
  configSettings: CombinedConfigOptions;
  renderChart: (data: DataStruct, width: number, height: number) => JSX.Element;
  initialData?: DataStruct;
}

const Chart: React.FC<ChartProps> = ({
  configSettings,
  renderChart,
  initialData = null,
}) => {
  const { config: globalConfig, registerAvailableOptions } = useGlobalConfig();
  const [showConfig, setShowConfig] = useState(false);
  const [width, setWidth] = useState(configSettings.width || 300);
  const [height, setHeight] = useState(configSettings.height || 300);
  const [data, setData] = useState<DataStruct|null>(initialData);
  const [settings, setSettings] = useState<ChartConfigOptions>(configSettings);

  useEffect(() => {
    const fetchNewData = async () => {
      const fetchedData = await fetchData(settings);
      setData(fetchedData);
    };
    if (!isEqual(settings, configSettings)) {
      fetchNewData();
    }
  }, [settings]);

  useEffect(() => {
    const fetchSchema = async () => {
      const schema = await getDataSetSchema(configSettings);
      // having found available options, pass up to global settings
      registerAvailableOptions(schema);
    };
    fetchSchema();
  }, [configSettings.dataset]);

  useEffect(() => {
    const newConfig = { 
      ...configSettings,
      filters: globalConfig.filters ?? configSettings.filters,
      grouping: globalConfig.grouping ?? configSettings.grouping,
    };
    if (!isEqual(newConfig, configSettings)) {
      setSettings(newConfig)
    }
  }, [globalConfig]);

  // callbacks to pass into config component:
  const handleConfigSave = async (newConfig: ChartConfigOptions) => {
    if (isEqual(newConfig, configSettings)) {
      return;
    }
    setSettings(newConfig)
    const fetchedData = await fetchData(newConfig);
    setData(fetchedData);
  };

  const toggleConfig = () => {
    setShowConfig(!showConfig);
  };

  const handleSizeChange = (newWidth: number, newHeight: number) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <div className="chart-widget">
      <div className="chart-container" style={{ width:width, height:height }}>
        
        {(data && renderChart(data, width, height))}

        <div className="chart-config-icon" onClick={toggleConfig}>
          <FontAwesomeIcon icon={faCog} style={{ fontSize: '24px' }} />
        </div>
        {showConfig && (
          <div className="chart-config-box">
            <ChartConfig
              onSizeChange={handleSizeChange}
              selectedConfig={settings}
              onConfigSave={handleConfigSave}
            />
          </div>
        )}
      </div>
      <div className='refreshDateTime'> <p>Data last refreshed at { (data && getRefreshDateTime(data)) }</p> </div>
    </div>
  );
};

export default Chart;
