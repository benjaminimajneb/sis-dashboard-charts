export type DataSetSchema = {
    name: string;
    title: string;
    measures: MeasureCollection;
    dimensions: DimensionCollection;
}

export type Measure = {
    name: string;
    title: string;
    shortTitle: string;
    type: string;
    aggType: string;
}

export type MeasureCollection = {
    [key in Measure['name']]: Measure;
};

export type Dimension = {
    dimension: string; //eg students.application_id
    suggestFilterValues: boolean; // presumably true if we can filter by this.
    title: string;
    shortTitle: string;
    description: string;
    type: string; //eg time, string
}

export type DimensionCollection = {
    [key in Dimension['dimension']]: Dimension;
};

