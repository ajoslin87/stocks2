window.onload = function(){

  for (i=0; i<aapl.length-1; i++){

dayOne = aapl[i].close;
//console.log(dayOne);
dayTwo = aapl[i+1].close;
//console.log(dayTwo);

dayOverDay = dayTwo-dayOne;
dayOver.push(dayOverDay);
//console.log(dayOver[i]);
theMax = (d3.max(dayOver))
maxIndex = dayOver.indexOf(theMax);
maxDate = aapl[maxIndex].date;


  }


//console.log(theMax);

//console.log(maxIndex);


//console.log("On" +" "+ maxDate + " Apple Changed by " + theMax );

var midiDateScale  = d3.scaleLinear().domain([0,127]).range([0, aapl.length]);

  midiDate = function(){
  midi = document.getElementById("midi").value
  midiDateIndex = Math.floor(midiDateScale(midi))
  document.getElementById("Datehtml").innerHTML = aapl[midiDateIndex].date;

  x.domain([aapl[midiDateIndex].date, dateEnd]);

  svg.select(".x")
    .transition()
      .call(xAxis);

}

//console.log(midiDateScale(127))
};
