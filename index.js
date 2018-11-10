var aapl = []
var dayOver = []
var dot;

var parseDate = d3.timeParse("%Y-%m-%d");

var margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = 600 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleTime().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxis = d3.axisBottom().scale(x)
  .ticks(5);

var yAxis = d3.axisLeft().scale(y)
  .ticks(5);

// Define the line
var valueline = d3.line()
  .x(function(d) {
    return x(d.date);
  })
  .y(function(d) {
    return y(d.close);
  })

// Adds the svg canvas
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var files = ["AAPL.csv"];
var promises = [];

files.forEach(function(url) {
  promises.push(d3.csv(url))
});

Promise.all(promises).then(function(data) {
  //d3.csv("AAPL.csv").then(function(data) {
  console.log("data", data);
  data[0].forEach(function(d) {
    d.date = parseDate(d.date);
    //console.log(d.date);
    d.close = +d.close;
    //console.log(d.close)
  });

  columns = data[0].columns;

  console.log(columns);

});

Promise.all(promises).then(function(data) {

  for (i = 0; i < data.length; i++) {
    aapl.push(data[i]);
  };


  // Scale the range of the data

  //x.domain([parseDate('2008-10-27'), parseDate('2009-02-16')]);
  x.domain(d3.extent(data[0], function(d) {
    return d.date;
  }));

  y.domain([0, d3.max(data[0], function(d) {
    return d.close;
  })]);
  //y.domain([0, 50]);

  // Add the valueline path.
  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data[0]))
    .style("fill", "none")
    .style("stroke", "#000");

  myFunc = function(d) {
    return (d.date.getTime() == (parseDate('2014-07-07')).getTime())
  }

  // Add the scatterplot

  //addDot = function() {

    dot = document.getElementById("dot").value;

    svg.selectAll("dot")
      .data(data[0])
      .enter().append("circle")
      .filter(myFunc)
      //.filter(function(d) { return d.date.getTime() == parseDate('2009-01-05').getTime})
      .style("fill", "red")
      .attr("r", 3.5)
      .attr("cx", function(d) {
        return x(d.date);
      })
      .attr("cy", function(d) {
        return y(d.close);
      })

//}
svg.selectAll("rect")
  .data(data[0])
  .enter().append('rect')
  .filter(myFunc)
  .style("opacity", .5)
  .style("fill", "red")
  .attr("x", function(d){
    return x(d.date);
  })
  .attr("y", 0)
  .attr("width",  100)
  .attr("height", height);


  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

});
