var aapl = [];
var aaplDates =[];
var dayOver = [];

var parseDate = d3.timeParse("%Y-%m-%d");
var prezParse = d3.timeParse("%d/%m/%Y");
var goldDate = d3.timeParse("%Y-%m");

var adate;

var closestDate;

var prez =[];

myFunc = function(d) {

  dotClose = dateFns.closestTo((parseDate(dot)).getTime(),aaplDates)
  console.log(dotClose)
  return d.date.getTime() == dotClose.getTime();
}

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
var valueline

// var valueline1 = d3.line()
//   .x(function(d){
//     return x(d.date);
//   })
//   .y(function(d){
//     return y(d.Adj_Close);
//   })

// Adds the svg canvas
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var files = ["AAPL.csv", "presidents.csv", "gold_monthly.csv"];
var loadFiles=[];
var promises = [];
var files2 =[];
var promises2 =[];

String.prototype.removeWord = function(searchWord){
    var str = this;
    var n = str.search(searchWord);
    while(str.search(searchWord) > -1){
        n = str.search(searchWord);
        str = str.substring(0, n) + str.substring(n + searchTerm.length, str.length);
    }
    return str;
}

var readIt;

var fileAdded = function(){

  file = document.getElementById("avatar").files[0];
  //d3fileObject = d3.csv(file.name)

    console.log(file);

      d3.csv(file.name).then(function(result){

           readIt = result.columns;
           console.log(readIt);
    })


}


var populate = function(){
    var columnSelect =[];
    var select = document.getElementById("select");

    for(var i=0; i<readIt.length; i++){


        var option = document.createElement("option"),
            txt = document.createTextNode(readIt[i]);
        option.appendChild(txt);
        option.setAttribute("value",columnSelect[i]);
       // columnSelect.push(readIt[i]);
        select.insertBefore(option,select.lastChild);
    }
    console.log("hello")
}


files.forEach(function(url) {
  promises.push(d3.csv(url))
});



Promise.all(promises).then(function(data) {
  //console.log("data", data[1]);
  data[0].forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });
 console.log
  data[1].forEach(function(d){
    d.Took_office = prezParse(d.Took_office)
    d.Left_office = prezParse(d.Left_office)
  })

  data[2].forEach(function(d){
    d.Date = goldDate(d.Date)
    d.Price = +d.Price;
  })

  columns = data[0].columns;

  console.log(data[1]);

  for (i = 0; i < data[0].length; i++) {

    aapl.push(data[0][i]);
    aaplDates.push(aapl[i].date)
  };
  //console.log(aapl);

  for(i=0; i<data[1].length; i++ ){
    prez.push(data[1][i].President)
  };



});

Promise.all(promises).then(function(data) {

var prezi = document.getElementById("prezi");

  for(var i=0; i<data[1].length; i++){
    var option = document.createElement("OPTION"),
    txt=document.createTextNode(prez[i]);
    option.appendChild(txt);
    option.setAttribute("value",prez[i]);
    prezi.insertBefore(option,prezi.lastChild);
  }

var lini = document.getElementById("lini");

  for(var i=0; i<columns.length; i++){
    var option = document.createElement("OPTION"),
    txt=document.createTextNode(columns[i]);
    option.appendChild(txt);
    option.setAttribute("value",columns[i]);
    lini.insertBefore(option,lini.lastChild);

  }
});


  Promise.all(promises).then(function(data) {

  // Scale the range of the data

  //x.domain([parseDate('2008-10-27'), parseDate('2009-02-16')]);



  //y.domain([0, 50]);

});
Promise.all(promises).then(function(data) {

var i = 0;

addLine = function(){
  // Add the valueline path.

theVal = lini.value
console.log(theVal);

y.domain([0, d3.max(data[0], function(d) {
  return d[theVal];
})]);


dateStart =parseDate(document.getElementById("dateStart").value);
dateEnd = parseDate(document.getElementById("dateEnd").value);


if(dateStart==null){
  dateStart = (data[0][0].date)
 //console.log(dateStart)
}

if(dateEnd ==null){
  dateEnd =((data[0][data[0].length-1]).date)
}

x.domain([dateStart, dateEnd]);

valueline = d3.line()
  .x(function(d) {
    return x(d.date);
  })
  .y(function(d) {
    return y(d[theVal]);
  })


if(i==0){
  svg.append("g")
    .attr("class", "y axis")
    .transition(6000)
    .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")").transition()

      .call(xAxis);

}

  var  lines = svg.selectAll("path")
  .data(data[0]).enter().append("path").transition().duration(7000)
    .attr("class", "line")
    .attr("d", valueline(data[0]))

    .style("fill", "none")
    .style("stroke", "#000")
    ;

  i++
};


changeDateRange = function(){

  dateStart = parseDate(document.getElementById("dateStart").value)
  dateEnd = parseDate(document.getElementById("dateEnd").value)

console.log("date Start ",dateStart);
console.log("date end" ,dateEnd);

  if(dateStart==null){
    dateStart = (data[0][0]).date
   console.log("date Start", dateStart)
  console.log("fuck your Haircut")
  }

  if(dateEnd ==null){
    dateEnd =(data[0][data[0].length-1]).date
    console.log("date End", dateEnd)
  }

  var svg = d3.select("body").transition();


console.log("date End", dateEnd)
console.log("date Start", dateStart)

   x.domain([dateStart, dateEnd]);

  svg.select(".line")
  .attr("d", valueline(data[0]))
  svg.select(".x")
    .transition()
      .call(xAxis)

      ;


}

update =  function() {
  			x.domain([0, Math.random(10, 10000)]);

  			svg.select(".x")
  				.transition()
  					.call(xAxis);

  		}

});
