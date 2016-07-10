var bpm = 140;
var delayPerBeat = 60 * 1000 / bpm;
var looping = {};

var chordProg1 = require('./loops/chordprog1.json');
var loopNames = ['chordProg1'];
var loops = {
  chordProg1: chordProg1
};

function startLoop(loopName, emitAll) {
  looping[loopName] = true;

  if (loops[loopName]) {
    nextNote(loops[loopName], 0, emitAll);
  }
}

function stopLoop(loopName) {
  looping[loopName] = false;
}

function nextNote(loop, i, emitAll) {
  var name = loop.name;
  if (looping[name]) {
    var sequence = loop.sequence;
    if (i >= sequence.length) {
      i = 0;
    }
    var noteData = sequence[i];
    var delayMs = delayPerBeat * noteData.delay;
    setTimeout(function() {
      emitAll(noteData.type, {id: name, note: noteData.note});
      nextNote(loop, i+1, emitAll);
    }, delayMs);
  }
}

function getAllLoops() {
  var list = [];
  for (var i=0; i<loopNames.length; i++) {
    var currentName = loopNames[i];
    var listItem = {
      name: currentName,
      playing: looping[currentName]
    }
    list.push(listItem);
  }
  return list;
}

module.exports = {startLoop: startLoop,
  stopLoop: stopLoop,
  getAllLoops: getAllLoops};
