import { DataStruct } from "../types/DataStruct";

export const getRefreshDateTime = (data: DataStruct): string => {
  //reduce the datasets array in data to find the earliest refreshDateTime
  return data.dataSets.reduce((acc, dataSet) => {
    if (dataSet.refreshDateTime < acc) {
      return dataSet.refreshDateTime;
    }
    return acc;
  }, data.dataSets[0].refreshDateTime);
};
