

Promise.all(promises).then(function(data) {


  addDot = function() {


    dot = document.getElementById("dot").value;

    svg.selectAll("dot"[i])
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
    }

var i=0;

addBar = function(){


console.log(i)

  prezIndex = (prez.indexOf(prezi.value));
  prezStart = (data[1][prezIndex].Took_office);
  prezEnd = (data[1][prezIndex].Left_office);

  tookOfficeClosest = dateFns.closestTo(prezStart.getTime(), aaplDates);
  leftOfficeClosest = dateFns.closestTo(prezEnd.getTime(), aaplDates);

svg.selectAll("rect"[i])
  .data(data[0])
  .enter().append('rect')
  //.filter(myFunc)
  .filter(function(d){
    return d.date.getTime() == tookOfficeClosest.getTime() })
  .style("opacity", .5)
  .style("fill", function(){
    if (data[1][prezIndex].Party == "Democratic"){
      return "blue"
    }else{
      return "red"
    }
  })  .attr("x", function(d){
    return x(d.date);
  })
  .attr("y", 0)
  .attr("width", function() { return x(new Date(leftOfficeClosest)) - x(new Date(tookOfficeClosest)) })
  .attr("height", height);
i++;
}

addPrez = function(){


for(i=42;i<data[1].length;i++){

  prezStart = (data[1][i].Took_office);
  //console.log(prezStart);
  prezEnd = (data[1][i].Left_office);

  tookOfficeClosest = dateFns.closestTo(prezStart.getTime(), aaplDates);
  //console.log(tookOfficeClosest)
  leftOfficeClosest = dateFns.closestTo(prezEnd.getTime(), aaplDates);

  svg.selectAll("rec"[i])
  .data(data[0])
  .enter().append('rect')
  .filter(function(d){
    return d.date.getTime()== tookOfficeClosest.getTime()})
    .style("opacity",.5)
    //.style("fill" ,"red")
    .style("fill", function(){
      if (data[1][i].Party == "Democratic"){
        return "blue"
      }else{
        return "red"
      }
    })

    .attr("x", function(d){
      return x(d.date);
    })
    .attr("y", 0)
    .attr("width", function() { return x(new Date(leftOfficeClosest)) - x(new Date(tookOfficeClosest)) })
    .attr("height",height);

    console.log(data[1][i].Party)
    console.log(data[1][i].President)

  }

}


});
