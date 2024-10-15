import React, { useState } from "react";
import LineChart from "./EchartsCharts/LineChart";
import BarChart from "./EchartsCharts/BarChart";
import PieChart from "./EchartsCharts/PieChart";
import KPI from "./CustomCharts/KPIChart";
import TableChart from "./CustomCharts/TableChart";
import FilterBar from "./FilterBar";
import GlobalConfigComponent from "./GlobalConfig";
import { GlobalConfigOptions, ChartConfigOptions } from "../types/ChartConfig";
import { DataStruct } from "../types/DataStruct";
import { GlobalConfigProvider } from "./GlobalConfigContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { STATS_API_DATA_ENDPOINT, MIS_DETAIL_PAGE_URL, MIS_DATA_URL } from "../../config";
import { mockAttendanceData } from "../Utils/fetchData";


const DataDashboard: React.FC<GlobalConfigOptions> = (globalConfig: GlobalConfigOptions) => {
  const [showGlobalConfig, setShowGlobalConfig] = useState(false);

  const toggleGlobalConfig = () => {
    setShowGlobalConfig(!showGlobalConfig);
  };

  const dashboardConfig = {
    theme: "light",
    sourceUrl: STATS_API_DATA_ENDPOINT + "/dataset/student_context",
  };
  
  //some of the widgets take you to a different page. (I've used the same one here as the data fetch url so it'll just print out JSON)
  const clickUrl = MIS_DETAIL_PAGE_URL;
  
  const mockLineChartConfig: ChartConfigOptions = {
    ...globalConfig,
    dataset: "attendance",
    measures: ["STUDENT_COUNT"],
    dimension: '',
    // different sourceUrl for this one (override global config):
    sourceUrl: MIS_DATA_URL,
    width: 300,
    height: 300,
    title: "Made Up Data Line Chart"
  };

  const mockDataToInjectRatherThanFetch: DataStruct = mockAttendanceData(mockLineChartConfig);

  return (
    <div className="dashboard">
      <div className="dashboard-header">

        <div className="dashboard-title">Bloody Dashboard Isn't It</div>
        <FontAwesomeIcon icon={faCog} style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '10px' }} onClick={toggleGlobalConfig} />

      </div>
      <GlobalConfigProvider initialConfig={dashboardConfig} >
      <FilterBar /> 
        {showGlobalConfig && <GlobalConfigComponent />}

        <div className="charts-container">

          <TableChart
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["STUDENT_COUNT"],
              dimension: "SCHOOL_NAME",
              grouping: "SCHOOL_NAME",
              width: 600,
              height: 300,
              dataset: "student_context",
              title: "Pupils on roll by school",
              click: {type:"filter"}
            }}
          />
          <KPI
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["STUDENT_COUNT"],
              dimension: '',
              grouping: '*',
              width: 300,
              height: 300,
              dataset: "student_context",
              title: "Total Students on roll"
            }}
          />

          <BarChart
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["COUNT_ETHNICITY"],
              dimension: "ETHNICITY",
              grouping: "ETHNICITY",
              width: 300,
              height: 300,
              dataset: "student_context",
              title: "By ethnicity bar chart",
              click: {type:"filter"}
            }}
          />

          <PieChart
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["COUNT_GENDER"],
              dimension: "GENDER",
              grouping: "GENDER",
              width: 300,
              height: 300,
              dataset: "student_context",
              title: "By gender",
              click: {type:"filter"}
            }}
          />

          <PieChart
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["COUNT_FSM"],
              dimension: "FSM",
              grouping: "FSM",
              width: 300,
              height: 300,
              dataset: "student_context",
              title: "FSM, not FSM ",
              click: {type: 'url', url: clickUrl},
            }}
          />
          <PieChart
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["STUDENT_COUNT"],
              dimension: "EVER6",
              grouping: "EVER6",
              
              width: 300,
              height: 300,
              dataset: "student_context",
              title: "EVER6 not ever6",
              click: {type: 'url', url: clickUrl },
            }}
          />
          <PieChart
            config={{
              ...globalConfig,
              sourceUrl: dashboardConfig.sourceUrl,
              measures: ["STUDENT_COUNT"],
              dimension: "DISAD",
              grouping: "DISAD",
              width: 300,
              height: 300,
              dataset: "student_context",
              title: "Disad/ not disad",
              click: { type: 'url', url: clickUrl },
            }}
          />
          <LineChart
            config={{ ...mockLineChartConfig, ...globalConfig } }
            initialData={ mockDataToInjectRatherThanFetch }
          />
              

{ 
        // in year admissions, mobile 5/6, mobile 10/11 by school (3 datasets, same grouping), bar chart
        // demographics by school table (cols for all the cohorts.)

}
        </div>
      </GlobalConfigProvider>
    </div>
  );
};

export default DataDashboard;
