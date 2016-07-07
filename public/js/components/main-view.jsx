var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Visualizer = require('./visualizer.jsx');
var Sequencer = require('./sequencer.jsx');
var Sound = require('../sound.js');
var MidiController = require('../midicontroller.js');
var keyboardNoteMap = require('../keyboardnotemap.js');
var midiNoteMap = require('../midinotemap.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      notesPlaying: {},
      localKeysPressed: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    self.state.socket = io();
    self.state.socket.on('startnote', function(data) {
      if (!self.state.notesPlaying[data.note]) {
        self.state.notesPlaying[data.note] = {};
      }
      self.state.notesPlaying[data.note][data.id] = Sound.getAudioBuffer(data.note);
      self.state.notesPlaying[data.note][data.id].start();
    });
    self.state.socket.on('stopnote', function(data) {
      if (self.state.notesPlaying[data.note]) {
        self.state.notesPlaying[data.note][data.id].stop();
        delete self.state.notesPlaying[data.note][data.id];
      }
    });
    self.state.socket.on('startloop', function(data) {

    });
    self.state.socket.on('stoploop', function(data) {

    });
    document.addEventListener('keydown', function(e) {
      e.preventDefault();
      var note = keyboardNoteMap[e.keyCode];
      if (note) {
        if (!self.state.localKeysPressed[e.keyCode]) {
          self.state.socket.emit('startnote', { id: self.state.socket.id, note: note });
          self.state.localKeysPressed[e.keyCode] = true;
        }
      }
    });
    document.addEventListener('keyup', function(e) {
      var note = keyboardNoteMap[e.keyCode];
      if (note) {
        self.state.socket.emit('stopnote', { id: self.state.socket.id, note: note });
        delete self.state.localKeysPressed[e.keyCode];
      }
    });

    MidiController.setMidiKeyDown(function(note) {
      console.log('asdf');
      var note = midiNoteMap[note];
      if (note) {
        self.state.socket.emit('startnote', { id: self.state.socket.id, note: note });
      }
    });
    MidiController.setMidiKeyUp(function(note) {
      console.log('fdsa');
      var note = midiNoteMap[note];
      if (note) {
        self.state.socket.emit('stopnote', { id: self.state.socket.id, note: note });
      }
    });
  },
  render: function() {
    return (
      <div className="main">
        <Sidebar />
        <Visualizer />
        <Sequencer />
      </div>
    );
  }
});
