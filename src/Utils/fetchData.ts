import { API_AUTH_TOKEN, STATS_API_META_ENDPOINT } from "../../config";
import { ChartConfigOptions } from "../types/ChartConfig";
import { DataSetSchema } from "../types/DataSetSchema";
import { DataStruct } from "../types/DataStruct";
import { stringifyFilter } from "../Utils/interactions";

const fetch = require('node-fetch');


export const fetchData = async (config: ChartConfigOptions): Promise<DataStruct> => {

  /**
   * uncomment to avoid hitting URLs:
   */
   return fetchMockLocalData(config);

  if (config.dataset === "attendance") {
    return fetchMockLocalData(config);
  }

  const { url, requestOptions } = createDataApiRequest(config);

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
     fetchMockLocalData(config);
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data: DataStruct = await response.json();

  return data;
};

type ApiRequest = { url: string, requestOptions: RequestInit }

const createDataApiRequest = (config: ChartConfigOptions): ApiRequest => {

  const baseUrl = config.sourceUrl;


  const queryParams = new URLSearchParams();
  if (config.grouping) {
    queryParams.append("grouping", config.grouping);
  }
  if (config.filters) {
    config.filters.forEach(filter => queryParams.append("filters[]", stringifyFilter(filter)));
  }
  config.measures.forEach(measure => queryParams.append("measures[]", measure));
  queryParams.append("dimension", config.dimension);

  const url = `${baseUrl}/dataset/${config.dataset}?${queryParams.toString()}`;

  return createApiRequest(url)
};

const createSchemaApiRequest = (config: ChartConfigOptions): ApiRequest => {
  const baseUrl = STATS_API_META_ENDPOINT;

  const url = `${baseUrl}/dataset/${config.dataset}`;

  return createApiRequest(url)
};

const createApiRequest = (url: string): ApiRequest => {

  const headers = new Headers({
    "Authorization": API_AUTH_TOKEN,
    "Accept": "application/json",
    "Content-Type": "application/json",
  });

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: headers,
    credentials: 'include'
  };

  return { url, requestOptions };

}



export const fetchMockLocalData = async (config: ChartConfigOptions): Promise<DataStruct> => {
  return mockAttendanceData(config);
}

export const mockAttendanceData = (config: ChartConfigOptions): DataStruct => {
  let firstDataSet = [
    { dimensionValue: 'Jan', measureValue: 95 }, { dimensionValue: 'Feb', measureValue: 91 }, { dimensionValue: 'Mar', measureValue: 85 }, { dimensionValue: 'Apr', measureValue: 92 },
  ];

  if (!config.grouping || config.grouping === 'SCHOOL_NAME'){
    firstDataSet = [...firstDataSet,     { dimensionValue: 'May', measureValue: 90 }, { dimensionValue: 'Jun', measureValue: 91 }, { dimensionValue: 'Jul', measureValue: 88 }, { dimensionValue: 'Aug', measureValue: 90 },
      { dimensionValue: 'Sep', measureValue: 91 }, { dimensionValue: 'Oct', measureValue: 89 }, { dimensionValue: 'Nov', measureValue: 90 }, { dimensionValue: 'Dec', measureValue: 92 }]
  }
  
  return {
    sourceUrl: 'data.com/data',
    dataSets: [
      {
        dimension: "Attendance 1",
        data: firstDataSet,
        refreshDateTime: "2021-01-01T00:00:00Z"
      },
      {
        dimension: "Attendance 2",
        data: [
          { dimensionValue: 'Jan', measureValue: 85 }, { dimensionValue: 'Feb', measureValue: 87 }, { dimensionValue: 'Mar', measureValue: 88 }, { dimensionValue: 'Apr', measureValue: 86 },
          { dimensionValue: 'May', measureValue: 89 }, { dimensionValue: 'Jun', measureValue: 85 }, { dimensionValue: 'Jul', measureValue: 86 }, { dimensionValue: 'Aug', measureValue: 88 },
          { dimensionValue: 'Sep', measureValue: 85 }, { dimensionValue: 'Oct', measureValue: 87 }, { dimensionValue: 'Nov', measureValue: 86 }, { dimensionValue: 'Dec', measureValue: 88 }
        ],
        refreshDateTime: "2021-01-01T00:00:00Z"
      },
      {
        dimension: "Attendance 3",
        data: [
          { dimensionValue: 'Jan', measureValue: 65 },  { dimensionValue: 'Mar', measureValue: 78 }, { dimensionValue: 'Apr', measureValue: 76 },
          { dimensionValue: 'Jun', measureValue: 75 }, { dimensionValue: 'Jul', measureValue: 76 }, { dimensionValue: 'Aug', measureValue: 85 },
          { dimensionValue: 'Sep', measureValue: 81 }, { dimensionValue: 'Oct', measureValue: 89 }, { dimensionValue: 'Nov', measureValue: 96 }, { dimensionValue: 'Dec', measureValue: 98 }
        ],
        refreshDateTime: "2021-01-01T00:00:00Z"
      },
    ],
    title: "Monthly Attendance %",
    measure: "% present",
    dimension: "Month",
  }
}


const schemaCache: { [key: string]: DataSetSchema } = {};

export const getDataSetSchema = async (config: ChartConfigOptions): Promise<DataSetSchema> => {
  if (schemaCache[config.dataset]) {
    return schemaCache[config.dataset];
  }


  return mockSchema(config);

  const sourceUrl = config.sourceUrl;

  const { url, requestOptions } = createSchemaApiRequest(config);

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    console.log(response)
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const schema: DataSetSchema = await response.json();
  console.log(schema)

  return schema;

};

const mockSchema = async (config: ChartConfigOptions): Promise<DataSetSchema> => {
  const schemas: { [key: string]: DataSetSchema } = {
    student_context: {
      filters: [
        {
          dimension: "ethnicity",
          value: "White - British"
        }
      ],
      groupings: ["ethnicity"],
      measures: ["students"],
      dimensions: ["incidents", "ethnicity"]
    },
    attendance: {
      filters: [
        {
          dimension: "ethnicity",
          value: "White - British"
        }, {
          dimension: "age",
          value: "10"
        }
      ],
      groupings: ["age", "ethnicity"],
      measures: ["students"],
      dimensions: ["perc_present", "age"]
    },
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      schemaCache[config.dataset] = schemas[config.dataset];
      resolve(schemas[config.dataset]);
    }, 1000); // Simulate API delay
  });
}