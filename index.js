var aapl = [];
var aaplDates =[];
var dayOver = [];
var aaplSelect =[];
var columnSelect =[];

var parseDate = d3.timeParse("%Y-%m-%d");
var prezParse = d3.timeParse("%d/%m/%Y");
var goldDate = d3.timeParse("%Y-%m");
//var dateEnd;

var adate;

var closestDate;

var prez =[];

myFunc = function(d) {

  dotClose = dateFns.closestTo((parseDate(dot)).getTime(),aaplDates)
  console.log(dotClose)
  return d.date.getTime() == dotClose.getTime();
}

var margin = {
    top: 75,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = 600 - margin.left - margin.right,
  height = 315 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scaleTime().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxis = d3.axisBottom().scale(x)
  .ticks(5);

var yAxis = d3.axisLeft().scale(y)
  .ticks(8);

// Define the line
var valueline;

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

let readIt;

const fileAdded = function(){

  file = document.getElementById("avatar").files[0];
  //d3fileObject = d3.csv(file.name)

    console.log(file);

      d3.csv(file.name).then(function(result) {

          readIt = result.columns;
          //readItLc  = readIt.toLowerCase()
          console.log(readIt)
          console.log(result[0].date);
          for (i = 0; i < result.length; i++) {
              loadFiles.push(result[i]);
              //console.log(loadFiles[i].date);
          }
          console.log(d3.min(loadFiles, d=> d.date));
          console.log(d3.max(loadFiles, d=> d.date));
      })


}


const populate = function(){
    var columnSelect =[];
    var mySelection = document.getElementById("mySelection");

    for(var i=0; i<readIt.length; i++){
        var option = document.createElement("option"),
            txt = document.createTextNode(readIt[i]);
        option.appendChild(txt);
        option.setAttribute("value",readIt[i]);
       // columnSelect.push(readIt[i]);
        mySelection.insertBefore(option,mySelection.lastChild);
    }
    console.log(mySelection)

    Promise.all(loadFiles).then(function(data){
        console.log(data[0]);
    })

};


files.forEach(function(url) {
  promises.push(d3.csv(url))
    console.log(url);
});



Promise.all(promises).then(function(data) {
  //console.log("data", data[1]);
  data[0].forEach(function(d) {
    d.date = parseDate(d.date);
   // d.close = +d.close;
   // d.High = +d.High;
  });
  data[1].forEach(function(d){
    d.Took_office = prezParse(d.Took_office)
    d.Left_office = prezParse(d.Left_office)
  })

  data[2].forEach(function(d){
    d.Date = goldDate(d.Date)
    d.Price = +d.Price;
  })

  columns = data[0].columns;

  //console.log(data[1]);

  for (i = 0; i < data[0].length; i++) {

    aapl.push(data[0][i]);
    aaplDates.push(aapl[i].date);
  };


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


  Promise.all(loadFiles).then(function(data) {

  // Scale the range of the data

  x.domain([parseDate('2008-10-27'), parseDate('2009-02-16')]);



  y.domain([0, 50]);

});

  addLine2 = function () {

      //var theVal
      Promise.all(loadFiles).then(function (data) {
          //i = 0;

          // Add the valueline path.
          console.log(data)
          //addLine();


          theVal2 = mySelection.value
          console.log(theVal2);

          //aaplSelect.length = 0;
          for (let j = 0; j < loadFiles.length; j++) {

              columnSelect.push(+loadFiles[j][theVal2]);


              //console.log(columnSelect);


              maxSelectValue = d3.max(data, function (d) {
                  return (+d[theVal2]);
              });
          }
          console.log(maxSelectValue);
          console.log(aaplSelect);
//console.log(aaplSelect.indexOf(+maxSelectValue));

          y.domain([0, maxSelectValue]);




      dateStart = parseDate(document.getElementById("dateStart").value);
      dateEnd = parseDate(document.getElementById("dateEnd").value);


      //if (dateStart == null) {
           startDate = (data[0].date)
          console.log(startDate);
      //}

      //if (dateEnd == null) {
          endDate = ((data[data.length - 1]).date)
          console.log(endDate)
      //}

      x.domain([parseDate(startDate), parseDate(endDate)]);

      valueline = d3.line()
          .x(function (data) {
              return x(parseDate(data.date));
          })
          .y(function (data) {
              return y(data[theVal2]);
          })


//if(i===0){
      svg.append("g")
          .attr("class", "y axis")
          .transition(6000)
          .call(yAxis);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")").transition()
          .call(xAxis);

//}

      svg.append("path")
          .data([data])//.enter().append("path")//.transition().duration(7000)
          .attr("class", "line")
          .attr("d", valueline)
          .style("fill", "none")
          .style("stroke", "#000");

  })
    };

//  var addLine = function(){
//   /* Add the valueline path.*/
//
//      theVal = lini.value
// console.log(theVal,i);
// aaplSelect.length = 0;
//     for (let j = 0; j < aapl.length; j++) {
//
//         aaplSelect.push(+aapl[j][theVal]);
//
//     }
//
//
// maxSelectValue = d3.max(data,function(d){
//     return (+d[theVal]);
// });
//
// console.log(maxSelectValue);
// console.log(aaplSelect);
// //console.log(aaplSelect.indexOf(+maxSelectValue));
//
// y.domain([0, maxSelectValue]);
//
//
// dateStart =parseDate(document.getElementById("dateStart").value);
// dateEnd = parseDate(document.getElementById("dateEnd").value);
//
//
// if(dateStart==null){
//   dateStart = (data[0][0].date)
//  console.log(data[0]);
// }
//
// if(dateEnd ==null) {
//     dateEnd = ((data[0][data[0].length - 1]).date)
//
//
//     x.domain([dateStart, dateEnd]);
//
//     valueline = d3.line()
//         .x(function (d) {
//             return x(+d.date);
//         })
//         .y(function (d) {
//             return y(d[theVal]);
//         })
//
// }
// //if(i===0){
//   svg.append("g")
//     .attr("class", "y axis")
//     .transition(6000)
//     .call(yAxis);
//
//     svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")").transition()
//
//       .call(xAxis);

//}

//    svg.selectAll("path"[i])
//   .data(data[0]).enter().append("path").transition().duration(7000)
//     .attr("class", "line")
//     .attr("d", valueline(data[0]))
//     .style("fill", "none")
//     .style("stroke", "#000");
//
//   i++
// };

//dateEnd =(data.length-1).date


//     changeDateRange = function(){
//
//
//
//         aaplDate2=[];
//
//     for (let j = 0; j < aapl.length; j++) {
//
//         aaplDate2.push(+aapl[j].date);
//
//     }
//
//   dateEnd1 =dateEnd;
//
//   dateStart1 = parseDate(document.getElementById("dateStart").value);
//
//     if(dateStart1==null) {
//         closestStart = (dateFns.closestTo((dateStart).getTime(), aaplDates));
//         startString = closestStart.toString();
//         startIndex = aaplDates.findIndex(function (index) {
//             return index == startString;
//         });
//     }else{
//         closestStart = (dateFns.closestTo((dateStart1).getTime(), aaplDates));
//         startString = closestStart.toString();
//         startIndex = aaplDates.findIndex(function (index) {
//             return index == startString;
//         });
//     }
//   dateEnd1 = parseDate(document.getElementById("dateEnd").value);
//
//         if (dateEnd1 == null) {
//     //parseEnd = new Date(dateEnd);
//     closestEnd = (dateFns.closestTo((dateEnd).getTime(), aaplDates));
//     endString = closestEnd.toString();
//     endIndex = aaplDates.findIndex(function (index) {
//         return index == endString;
//     });
//         }else{
//         closestEnd = (dateFns.closestTo((dateEnd1).getTime(), aaplDates));
//         endString = closestEnd.toString();
//         endIndex = aaplDates.findIndex(function (index) {
//                 return index == endString;
//             });
//         };
//   console.log(startString);
//   console.log(startIndex);
//   console.log(endString);
//   console.log(endIndex);
//
//   //console.log("date Start ",dateStart);
//     // console.log("date end" ,dateEnd);
//
//         adjustedData = data[0].slice(startIndex,endIndex);
//
//   if(dateStart==null){
//     dateStart = (data[0][0]).date
//    console.log("date Start", dateStart)
//   console.log("fuck your Haircut")
//   }
//
//     if(dateEnd == null){
//         dateEnd =(data[0].length-1).date
//         console.log("date End", dateEnd)
//     }
//
//   var svg = d3.select("body").transition();
//
//   //console.log("date Start", dateStart);
//   //console.log("date End", dateEnd);
//
//
//    x.domain(d3.extent([closestStart, closestEnd]));
//     y.domain([0, maxSelectValue]);
//
//
//   svg.select(".line")
//   .attr("d", valueline(adjustedData))
//       .attr(["width",width])
//       .attr(["height",height])
//       .style("fill", "none")
//       .style("stroke", "#e70c29")
//       .attr('x', 0);
//   svg.select(".x")
//     .transition()
//       .call(xAxis)
//
//       ;
//
//
// }

// update =  function() {
//   			x.domain([0, Math.random(10, 10000)]);
//
//   			svg.select(".x")
//   				.transition()
//   					.call(xAxis);
//
//   		}

