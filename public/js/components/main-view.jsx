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
      users: [],
      viewportHeight: 500,
      loopList: []
    }
  },
  componentDidMount: function() {
    var self = this;
    self.state.socket = io();
    self.state.socket.on('usersupdated', function(data) {
      self.setState({'users': data});
    });

    self.state.socket.on('loopsupdated', function(data) {
      self.setState({'loopList': data});
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

    document.addEventListener('keydown', function(e) {
      var note = keyboardNoteMap[e.keyCode];
      if (note) {
        e.preventDefault();
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

    self.setState({'viewportHeight': document.body.offsetHeight});
    window.addEventListener('resize', function(e) {
      self.setState({'viewportHeight': document.body.offsetHeight});
    });
  },
  render: function() {
    return (
      <div className="main">
        <Sidebar
          onLoopChange={this.onLoopChange}
          loopList={this.state.loopList} />
        <Visualizer
          users={this.state.users}
          notesPlaying={this.state.notesPlaying}
          viewportHeight={this.state.viewportHeight} />
        <Sequencer />
      </div>
    );
  },
  onLoopChange: function(shouldPlay, loopName) {
    if (shouldPlay) {
      this.state.socket.emit('startloop', {name: loopName});
    } else {
      this.state.socket.emit('stoploop', {name: loopName});
    }
    this.state.socket.emit('')
  }
});
