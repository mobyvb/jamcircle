var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var $ = require('jquery');

var currentInstrumentBuffers = {};
$.ajax({url: '/js/soundfonts/acoustic_grand_piano.json', success: function(result) {
  setupInstrument(result);
}});

function setupInstrument(instrument) {
  currentInstrumentBuffers = {};
  for (var note in instrument) {
    addNoteToBuffer(note, instrument, currentInstrumentBuffers);
  }
}

function addNoteToBuffer(note, instrumentData, instrumentBuffers) {
  var noteBuffer = base64ToArrayBuffer(instrumentData[note]);
  audioCtx.decodeAudioData(noteBuffer, function(buffer) {
    instrumentBuffers[note] = buffer;
    if (Object.keys(instrumentData).length === Object.keys(instrumentBuffers).length) {
    }
  });
}

function getAudioBuffer(note) {
  var sound = audioCtx.createBufferSource();
  sound.buffer = currentInstrumentBuffers[note];
  sound.connect(audioCtx.destination);
  return sound;
}

function base64ToArrayBuffer(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

module.exports = {
  getAudioBuffer: getAudioBuffer
};
