var React = require('react');
var PianoNote = require('./piano-note.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      trackerDist: 0,
      measureLines: [],
      progression: [
        {
          "type": "startnote",
          "note": "C3",
          "delay": 0
        },
        {
          "type": "startnote",
          "note": "E3",
          "delay": 0
        },
        {
          "type": "startnote",
          "note": "G3",
          "delay": 0
        },
        {
          "type": "stopnote",
          "note": "C3",
          "delay": 4
        },
        {
          "type": "stopnote",
          "note": "E3",
          "delay": 0
        },
        {
          "type": "stopnote",
          "note": "G3",
          "delay": 0
        },

        {
          "type": "startnote",
          "note": "G2",
          "delay": 0
        },
        {
          "type": "startnote",
          "note": "B2",
          "delay": 0
        },
        {
          "type": "startnote",
          "note": "D3",
          "delay": 0
        },
        {
          "type": "stopnote",
          "note": "G2",
          "delay": 4
        },
        {
          "type": "stopnote",
          "note": "B2",
          "delay": 0
        },
        {
          "type": "stopnote",
          "note": "D3",
          "delay": 0
        }
      ]
    }
  },
  componentDidMount: function() {
    this.startLoop();
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.measureCount != nextProps.measureCount
      || this.props.timeSignatureTop != nextProps.timeSignatureTop
      || this.props.timeSignatureBottom != nextProps.timeSignatureBottom
      || this.props.viewportWidth != nextProps.viewportWidth) {
      this.updateMeasureLines(nextProps);
    }
  },
  render: function() {
    var trackerDist = this.state.trackerDist;
    var trackerStyle = {
      left: trackerDist + 'px'
    };

    return (
      <div className='piano-roll'>
        <div className='tracker' style={trackerStyle}>
          <div className='tracker-arrow'></div>
          <div className='tracker-line'></div>
        </div>
        {this.state.measureLines}
      </div>
    );
  },
  startLoop: function() {
    // setInter
  },
  updateMeasureLines: function(newProps) {
    var linesNeeded = newProps.measureCount * newProps.timeSignatureTop;
    var sequenceWidth = newProps.viewportWidth - 60;
    var widthPerLine = sequenceWidth / linesNeeded;
    var lineDivs = [];
    for (var i=1; i<=linesNeeded; i++) {
      var className = 'measure-line';
      if (i % newProps.timeSignatureTop === 0) {
        className = 'measure-line end-measure';
      }
      var position = widthPerLine * i;
      var style = {
        left: position + 'px'
      };
      var nextLine = <div key={'line' + i}
        className={className}
        style={style}></div>
      lineDivs.push(nextLine);
    }
    this.setState({measureLines: lineDivs});
  },
  getNoteElems: function() {
    var timeNow = 0;
    var progression = this.state.progression;
    var openNotes = {};
    for (var i=0; i<progression.length; i++) {
      var currInstruction = progression[i];
      if (currInstruction.type === 'startnote') {

      } else if (currInstruction.type === 'endnote') {

      }
    }
  }
});