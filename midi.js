var midi, data;
// start talking to MIDI controller
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  console.warn("No MIDI support in your browser")
}

// on success
function onMIDISuccess(midiData) {
  // this is all our MIDI data
  midi = midiData;
  var allInputs = midi.inputs.values();
  var output = midiData.outputs;
  // loop over all available inputs and listen for any MIDI input
  for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
    // when a MIDI value is received call the onMIDIMessage function
    input.value.onmidimessage = gotMIDImessage;
  }
}
var noteFreq=0;

function gotMIDImessage(messageData) {

  console.log(messageData.data);

   buttonId = messageData.data[1];
   buttonValue = messageData.data[2];
   channelVal = messageData.data[0];

  var myScale = d3.scaleLinear()
    .domain([0, 127])
    .range([0, 10])

  scaledButton = myScale(buttonValue) / 10;
  console.log(buttonId);
  console.log(buttonValue);
  console.log(scaledButton);

  var noteScale = d3.scaleLinear()
    .domain([0, 127])
    .range([0,aapl.length-1])

  noteFreq = Math.floor(noteScale(buttonValue));

console.log(noteFreq)

//.domain([aapl[noteFreq].date, dateEnd]);

dateStart1=aapl[noteFreq].date

console.log(dateStart1);


svg.select(".x")
  .transition()
    .call(xAxis);

}

//   myOscilloscope.lineColor = "#" + "00" + r + "00";
//
//   switch (buttonId) {
//     case 0:
//       if (gainNodeA.gain.value == 0) {
//         gainNodeA.gain.value = 1;
//         $("#noteVal").html(gainNodeA.frequency);
//         $('#g1light').attr("fill", "blue");
//         console.log(dataArray);
//       } else {
//         gainNodeA.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g1light').attr("fill", "red");
//
//       }
//       break;
//
//     case 1:
//       if (gainNodeB.gain.value == 0) {
//         gainNodeB.gain.value = 1;
//         $("#noteVal").html(this.frequency);
//         $('#g2light').attr("fill", "blue");
//         console.log(dataArray);
//       } else {
//         gainNodeB.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g2light').attr("fill", "red");
//
//       }
//
//       break;
//
//     case 2:
//       if (gainNodeC.gain.value == 0) {
//         gainNodeC.gain.value = 1;
//         $("#noteVal").html(noteFreq);
//         $('#g3light').attr("fill", "blue");
//
//       } else {
//         gainNodeC.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g3light').attr("fill", "red");
//
//
//       }
//       break;
//
//     case 3:
//       if (gainNodeD.gain.value == 0) {
//         gainNodeD.gain.value = 1;
//         $("#noteVal").html(noteFreq);
//         $('#g4light').attr("fill", "blue");
//
//
//       } else {
//         gainNodeD.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g4light').attr("fill", "red");
//
//
//       }
//       break;
//
//     case 4:
//       if (gainNodeE.gain.value == 0) {
//         gainNodeE.gain.value = 1;
//         $("#noteVal").html(noteFreq);
//         $('#g5light').attr("fill", "blue");
//
//
//       } else {
//         gainNodeE.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g5light').attr("fill", "red");
//
//
//       }
//       break;
//
//     case 5:
//       if (gainNodeF.gain.value == 0) {
//         gainNodeF.gain.value = 1;
//         $("#noteVal").html(noteFreq);
//         $('#g6light').attr("fill", "blue");
//
//
//       } else {
//         gainNodeF.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g6light').attr("fill", "red");
//
//
//       }
//       break;
//
//     case 6:
//       if (gainNodeG.gain.value == 0) {
//         gainNodeG.gain.value = 1;
//         $("#noteVal").html(noteFreq);
//         $('#g7light').attr("fill", "blue");
//
//       } else {
//         gainNodeG.gain.value = 0;
//         $("#noteVal").html(noteFreq);
//         $('#g7light').attr("fill", "red");
//       }
//
//       break;
//     case 7:
//       if (gain1.gain.value == 0) {
//         gain1.gain.value = 1
//         $("#noteVal").html(noteFreq);
//         $('#g8light').attr("fill", "blue");
//       } else {
//         gain1.gain.value = 0
//         $("#noteVal").html(noteFreq);
//         $('#g8light').attr("fill", "red");
//       }
//       break;
//     case 23:
//       osc1.frequency.setValueAtTime(noteScale(buttonValue), audioCtx.currentTime);
// break;
//       // case 67:
//       //   if(masterGain.gain.value==0){
//       //     masterGain.gain.value =1
//       //   }else{
//       //     masterGain.gain.value = 0;
//       //   }
//     case 24: masterGain.gain.value=scaledButton;
// }
//
//
//
// if (buttonId==67 && masterGain.gain.value == 0 && buttonValue == 64){
//   masterGain.gain.value = 1;
// }else if(buttonId==67 && masterGain.gain.value!=0 && buttonValue == 64){
//   masterGain.gain.value=0
// }
//
// }
//
//
//
// // function gotMidimessage2(messageData){
// //   console.log(messageData.data);
// //
// //   if (messageData.data[1]==8 && messageData.data[2]==64){
// //     playB();
// //   } else if (messageData.data[1]==8 && messageData.data[2]==0){
// //     stopB();
// //   }
// // }
// //
// // function gotMidimessage3(messageData){
// //
// // function whatButton(i){
// //   messageData.data[2]=i;
// //   console.log(i);
// // }
// //
// //   }



// on failure
function onMIDIFailure() {
  console.warn("Not recognising MIDI controller")
};
