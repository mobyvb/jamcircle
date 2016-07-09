var React = require('react');
var Sidebar = require('./sidebar.jsx');
var Visualizer = require('./visualizer.jsx');
var Sequencer = require('./sequencer.jsx');
var Sound = require('../helpers/sound.js');
var MidiController = require('../helpers/midicontroller.js');
var keyboardNoteMap = require('../helpers/keyboardnotemap.js');
var midiNoteMap = require('../helpers/midinotemap.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      notesPlaying: {},
      localKeysPressed: {},
      users: []
    }
  },
  componentDidMount: function() {
    var self = this;
    self.state.socket = io();
    self.state.socket.on('usersupdated', function(data) {
      self.setState({'users': data});
    });

    self.state.socket.on('startnote', function(data) {
      var notesPlaying = self.state.notesPlaying;
      if (!notesPlaying[data.id]) {
        notesPlaying[data.id] = {};
      }
      notesPlaying[data.id][data.note] = Sound.getAudioBuffer(data.note);
      notesPlaying[data.id][data.note].start();
      self.setState({'notesPlaying': notesPlaying});
    });
    self.state.socket.on('stopnote', function(data) {
      var notesPlaying = self.state.notesPlaying;
      if (notesPlaying[data.id]) {
        notesPlaying[data.id][data.note].stop();
        delete notesPlaying[data.id][data.note];
      }
      self.setState({'notesPlaying': notesPlaying});
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
          self.state.socket.emit('startnote', { note: note });
          self.state.localKeysPressed[e.keyCode] = true;
        }
      }
    });
    document.addEventListener('keyup', function(e) {
      var note = keyboardNoteMap[e.keyCode];
      if (note) {
        self.state.socket.emit('stopnote', { note: note });
        delete self.state.localKeysPressed[e.keyCode];
      }
    });

    MidiController.setMidiKeyDown(function(note) {
      var note = midiNoteMap[note];
      if (note) {
        self.state.socket.emit('startnote', { note: note });
      }
    });
    MidiController.setMidiKeyUp(function(note) {
      var note = midiNoteMap[note];
      if (note) {
        self.state.socket.emit('stopnote', { note: note });
      }
    });
  },
  render: function() {
    return (
      <div className="main">
        <Sidebar />
        <Visualizer users={this.state.users} notesPlaying={this.state.notesPlaying} />
        <Sequencer />
      </div>
    );
  }
});
