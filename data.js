window.onload = function(){

  for (i=0; i<aapl.length-1; i++){

dayOne = aapl[i].close;
//console.log(dayOne);
dayTwo = aapl[i+1].close;
//console.log(dayTwo);

dayOverDay = dayTwo-dayOne;
dayOver.push(dayOverDay);
console.log(dayOver[i]);
theMax = (d3.max(dayOver))
  }

//console.log(theMax);

maxIndex = dayOver.indexOf(theMax);
console.log(maxIndex);

maxDate = aapl[maxIndex].date;

//console.log("On" +" "+ maxDate);
};
