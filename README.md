# Charts Dashboard

The App component contains a two dashboards: one is a test of a whole bunch of different libraries, the other is a deep dive into interactive/linked charts

## The Dashboard 
This component contains multiple charts
Each chart:
 - 'extends' from a BaseChart component.
 - Is an adapter 
    - it meets a type that takes a standard DataStruct and Config as an input. 
    - Where the underlying library requires a different structure we use a transform function
 - has a Config component built in that allows the user to change the chart's configuration
 - Doing it this way (as opposed to one global chart component with the chart type itself controlled by input/options) means we don't have to repeat code that controls config & config UI, it means each chart type is a separate function, so we can easily swap them with imports & we don't end up with massive switch statements inside some global component handling different cases for different charts.
There is a global config component that shows the intersection of settings that apply to each chart (cycling through schemas for each)
There is global state management of selected configs (inc filters and groupings) that allows:
 - Updating the global config updates the config of each chart.
 - You can interact with each chart - either by filtering or redirecting. Filters are set to update the global config.

### Critically: 
This is an exercise in defining interfaces & boundaries - between components, between charts, between front end & api.
See the Types defined for different types of data & metadata structs.

## Libraries Dashboard 
This is just a bunch of static data passed into the same sort of components from each library in an attempt to compare how they work
    


## Questions / things to address
Validation & error handling when chart configs don't match dataset?
