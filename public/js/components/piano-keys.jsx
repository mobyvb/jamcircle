var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      noteList: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
    }
  },
  render: function() {
    var keyDivs = [];
    var nextNoteIndex = 0;
    var nextNoteOctave = 0;
    for (var i=0; i<88; i++) {
      var nextNoteLetter = this.state.noteList[nextNoteIndex];
      var classes = 'key';
      if (nextNoteLetter === 'C') {
        nextNoteOctave++;
      } else if (nextNoteLetter.indexOf('b') >= 0) {
        classes = 'key sharp';
      }
      var nextNoteName = nextNoteLetter + nextNoteOctave;
      var keyDiv = <div key={nextNoteName} className={classes}>
        {nextNoteName}
      </div>;
      keyDivs.push(keyDiv);
      nextNoteIndex++;
      if (nextNoteIndex >= this.state.noteList.length) {
        nextNoteIndex = 0;
      }
    }

    return (
      <div className='piano-keys'>
        {keyDivs}
      </div>
    );
  }
});
