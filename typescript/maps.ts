import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";

let root = am5.Root.new("chartdiv");
let chart = root.container.children.push(
  am5map.MapChart.new(root, {})
);
let polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
         geoJSON: worldLow,
        //  exclude: ["AQ"]
    })
);

/*import * as am5 from "@amcharts/amcharts5";
import * as am5pie from "@amcharts/amcharts5/percent";

const root = am5.Root.new("chartdiv");
// Создать PieChart, добавить в root, вернуть созданный экземпляр PieChart
// Также можно создать экземпляр, затем добавить в root отдельной строкой
const chart = root.container.children.push(
    am5pie.PieChart.new(root, {})
);

// Параметры также можно устанавливать отдельно:
// series.set("valueField", "value");
// series.setAll({valueField: "value", ...});
const series = chart.series.push(
    am5pie.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
    })
)

series.data.setAll([{
    category: "Research",
    value: 1000
}, {
    category: "Marketing",
    value: 1200
}, {
    category: "Sales",
    value: 850
}]);
*/