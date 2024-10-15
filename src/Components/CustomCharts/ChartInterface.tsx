import "react-vis/dist/style.css";
import { CombinedConfigOptions } from "../../types/ChartConfig";
import { DataStruct } from "../../types/DataStruct";


export type Chart = (props: ChartProps) => React.ReactElement;

export type ChartProps = {
  config: CombinedConfigOptions;
  initialData?: DataStruct;
}
  