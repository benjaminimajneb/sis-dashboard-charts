import React from "react";
import { useGlobalConfig } from "./GlobalConfigContext";
import { Filter } from "../types/DataSetSchema";

const FilterBar: React.FC = () => {
    const { config, setConfig } = useGlobalConfig();

    const removeFilter = (filterToRemove: Filter) => {
      const updatedFilters = config.filters?.filter(filter => filter !== filterToRemove);
      setConfig({ ...config, filters: updatedFilters });
    };
  
    return (
        <div className="filter-bar">
          {config.filters && config.filters.length > 0 && (
            config.filters.map((filter: Filter, index) => (
              <span key={index} className="filter-box">
                {filter.dimension}: {filter.value}
                <span className="filter-remove" onClick={() => removeFilter(filter)}>✖</span>
              </span>
            ))
          )}
    </div>
  );
};

export default FilterBar;