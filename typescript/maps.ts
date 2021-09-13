import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";

let root = am5.Root.new("chartdiv");
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX", // rotate X instead of pan
    panY: "none",  // block Y
    maxPanOut: 0,  // map cannot leave view field (does nothing w/ maxZoomLevel=1)
    maxZoomLevel: 1, // Block zoom
    projection: am5map.geoNaturalEarth1()
  })
);
let polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
        geoJSON: worldLow,
        exclude: ["AQ"]
    })
);
/* Линии широты и долготы */
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
    stroke: root.interfaceColors.get("alternativeBackground"),
    strokeOpacity: 0.1
});
let pointSeries = chart.series.push(
    am5map.MapPointSeries.new(root, {
        polygonIdField: "country"
    })
);

var colorSet = am5.ColorSet.new(root, {});
polygonSeries.mapPolygons.template.adapters.add("fill", function (fill, target: any) {
    var dataContext = target.dataItem.dataContext;
    if (!dataContext.colorWasSet) {
      console.log(typeof target);
      dataContext.colorWasSet = true;
      var color = am5.Color.saturate(colorSet.getIndex(8), 0.3);
      target.setRaw("fill", color);
      return color;
    }
    else {
      return fill;
    }
  })

declare let window: any;
window.pl = polygonSeries;
window.am5 = am5;

const node = document.getElementById('word') as HTMLInputElement;
node.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        // polygonSeries.data.each(function(value, index) {
        //     if(value['id'] === 'RU') {
        //         let p = polygonSeries.mapPolygons.getIndex(index);
        //         console.log(index, value['id']);
        //         p.setRaw("fill", am5.Color.saturate(am5.Color.fromString('#ff0000'), 0.5));
        //     }
        // })
        // return false;
        fetch("http://127.0.0.1:8080/lemma/" + this.value)
        .then(response => response.json())
        .then(jsonResponse => {
            let s = JSON.stringify(jsonResponse[1]);
            document.getElementById("output").innerHTML = s;

            // polygonSeries.data.each(function(value, index) {
            //     console.log(index, value);
            // })

            let arr: Array<{country: string, count: Number}> = [];
            for(let i in jsonResponse[1]) {
                arr.push({country: i, count: jsonResponse[1][i]})
                console.log(i);
            }
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/#Relation_to_polygon_series
            // pointSeries.data.clear();
            // pointSeries.bullets.clear();
            chart.series.pop()
            let pointSeries = chart.series.push(
                am5map.MapPointSeries.new(root, {
                    polygonIdField: "country"
                })
            );
            pointSeries.bullets.push(() => 
                am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        centerX: am5.p50,
                        centerY: am5.p50,
                        text: "{country} ({count})",
                        populateText: true
                    })
                })
            );
            pointSeries.data.setAll(arr);

            // for(let i in polygonSeries.mapPolygons) {
            //     console.log(i);
            // }
            // for(let i in jsonResponse[0]) {
            //     polygonSeries.getDataItemById(i).setState("highlight");
            // }
            // polygonSeries..each(function(polygon) {
            //     polygon.setState("highlight");
            // });
        });
        return false;
    }
});

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