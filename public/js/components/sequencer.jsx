var React = require('react');
var PianoRoll = require('./piano-roll.jsx');
var PianoKeys = require('./piano-keys.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      bpm: 140,
      quantizeInterval: 1,
      timeSignatureTop: 4,
      timeSignatureBottom: 4,
      measureCount: 4,
      loopPlaying: false
    }
  },
  render: function() {
    var openClass = this.props.sequencerOpen ? 'open' : '';
    return (
      <div id='sequencer' className={openClass}>
        <div
          className='sequencer-close'
          onClick={this.props.closeSequencer}></div>
        <div className='sequencer-settings'>
          <label>BPM:</label>
          <input
            type='number'
            name='bpm'
            min={1}
            value={this.state.bpm}
            onChange={this.onBpmChange} />
          <label>Quantize Interval:</label>
          <input
            type='number'
            name='quantize-interval'
            min={0}
            value={this.state.quantizeInterval}
            onChange={this.onQuantizeIntervalChange} />
          <label>Time Signature:</label>
          <div className='time-signature'>
            <input
              type='number'
              name='time-signature-top'
              className='time-signature-top'
              min={1}
              value={this.state.timeSignatureTop}
              onChange={this.onTimeSignatureTopChange} />
            <input
              type='number'
              name='time-signature-bottom'
              className='time-signature-bottom'
              min={1}
              value={this.state.timeSignatureBottom}
              onChange={this.onTimeSignatureBottomChange} />
          </div>
          <label>Measure Count:</label>
          <input
            type='number'
            name='measure-count'
            min={1}
            value={this.state.measureCount}
            onChange={this.onMeasureCountChange} />
        </div>
        <div className='controls'>
          <div className='record'></div>
          <div onClick={this.startLoop} className='play'></div>
          <div onClick={this.stopLoop} className='stop'></div>
        </div>
        <div className='roll-container'>
          <PianoKeys />
          <PianoRoll
            bpm={this.state.bpm}
            quantizeInterval={this.state.quantizeInterval}
            timeSignatureTop={this.state.timeSignatureTop}
            timeSignatureBottom={this.state.timeSignatureBottom}
            measureCount={this.state.measureCount}
            viewportWidth={this.props.viewportWidth}
            loopPlaying={this.state.loopPlaying}
            startNote={this.props.startNote}
            stopNote={this.props.stopNote} />
        </div>
      </div>
    );
  },
  onBpmChange: function(e) {
    var newVal = e.target.value;
    if (!isNaN(newVal)) {
      this.setState({bpm: e.target.value});
    }
  },
  onQuantizeIntervalChange: function(e) {
    var newVal = e.target.value;
    if (!isNaN(newVal)) {
      this.setState({quantizeInterval: e.target.value});
    }
  },
  onTimeSignatureTopChange: function(e) {
    var newVal = e.target.value;
    if (!isNaN(newVal)) {
      this.setState({timeSignatureTop: e.target.value});
    }
  },
  onTimeSignatureBottomChange: function(e) {
    var newVal = e.target.value;
    if (!isNaN(newVal)) {
      this.setState({timeSignatureBottom: e.target.value});
    }
  },
  onMeasureCountChange: function(e) {
    var newVal = e.target.value;
    if (!isNaN(newVal)) {
      this.setState({measureCount: e.target.value});
    }
  },
  startLoop: function() {
    this.setState({loopPlaying: true});
  },
  stopLoop: function() {
    this.setState({loopPlaying: false});
  }
});
