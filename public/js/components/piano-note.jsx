var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      noteList: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    }
  },
  render: function() {
    var noteNumber = this.getNoteNumber();
    // px/note * notes/beat * beat/ms = px/ms
    var pxPerMs = this.props.measureLineDist * this.props.timeSignatureBottom / (4 * this.props.msPerBeat);

    var noteStyle = {
      top: (noteNumber * 22) + 'px',
      left: (pxPerMs * this.props.startTime + 1) + 'px',
      width: (pxPerMs * this.props.duration - 2) + 'px'
    };
    return (
      <div className='note' style={noteStyle}>
        {this.props.noteName}
      </div>
    );
  },
  getNoteNumber: function() {
    var noteLetter = this.props.noteName.slice(0, -1);
    var octave = parseInt(this.props.noteName.slice(-1));
    var letterIndex = this.state.noteList.indexOf(noteLetter);
    if (letterIndex === -1) {
      console.log(noteLetter + ' is not a valid note');
    }
    var keysFromBottom = letterIndex + 12 * octave - 8;
    return 88 - keysFromBottom;
  }
});
