import { Query } from "./CubeQueryStruct";

export type BlendedDataStruct = {
    results: DataStruct[];
    quequeryType: string; //in this case always "blendingQuery"
}

export type DataStruct = {
    data: Data<Query>;
    query: Query;
    lastRefreshTime: string;
  }
  
  // Utility type to extract keys from Query
  type ExtractKeys<T extends Query> = {
    [K in T['dimensions'][number] | T['measures'][number]]: any;
  }
  
  // Data type with keys from Query.dimensions and Query.measures
  export type Data<T extends Query> = ExtractKeys<T>;