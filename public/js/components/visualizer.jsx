var React = require('react');

module.exports = React.createClass({
  render: function() {
    var bubbles = this.getBubbles();
    var style = {
      height: (this.props.viewportHeight - 40) + 'px',
      width: (this.props.viewportHeight - 40) + 'px'
    };
    return (
      <div id='visualizer'>
        <div className='circle' style={style}>
          {bubbles}
        </div>
      </div>
    );
  },
  getBubbles: function() {
    var visualizerSize = this.props.viewportHeight - 40;
    var circleRadius = (visualizerSize - 100) / 2;
    var centerSize = circleRadius / 4;
    var userSize = circleRadius / 6;

    var users = Object.create(this.props.users);
    for (var i=0; i<this.props.loopList.length; i++) {
      var nextLoop = this.props.loopList[i];
      if (nextLoop.playing) {
        users.push(nextLoop.name);
      }
    }
    var numUsers = users.length;
    var degreesPerUser = 360 / numUsers;

    var bubbleDivs = [];

    var centerTop = visualizerSize / 2 - centerSize / 2;
    var centerLeft = visualizerSize / 2 - centerSize / 2;
    var centerStyle = {
      top: centerTop + 'px',
      left: centerLeft + 'px',
      width: centerSize + 'px',
      height: centerSize + 'px'
    };
    var centerDiv = (<div
      key='centerbubble'
      className='centerbubble'
      style={centerStyle}>
      </div>);
    bubbleDivs.push(centerDiv);

    var currentAngle = 0;
    for (var i = 0; i < numUsers; i++) {
      var userId = users[i];
      var xFromCenter = circleRadius * Math.cos(this.toRadians(currentAngle));
      var yFromCenter = circleRadius * Math.sin(this.toRadians(currentAngle));
      var userTop = yFromCenter + visualizerSize / 2 - userSize / 2;
      var userLeft = xFromCenter + visualizerSize / 2 - userSize / 2;
      var userStyle = {
        top: userTop + 'px',
        left: userLeft + 'px',
        width: userSize + 'px',
        height: userSize + 'px'
      };
      var userDiv = (<div
        key={userId}
        className='userbubble'
        style={userStyle}>
        </div>);
      bubbleDivs.push(userDiv);

      var userNotes = [];
      var notesPlayingForUser = [];
      var containerHeight = 0;
      if (this.props.notesPlaying[userId]) {
        notesPlayingForUser = Object.keys(this.props.notesPlaying[userId]);
      }
      for (var j=0; j<notesPlayingForUser.length; j++) {
        var note = notesPlayingForUser[j];
        var letter = note.slice(0, -1).toLowerCase();
        userNotes.push(<div key={userId+note} className={'note ' + letter}></div>);
        containerHeight += 4;
      }

      var noteContainerStart = {
        x: centerLeft + centerSize / 2,
        y: centerTop + centerSize / 2
      };
      var noteContainerEnd = {
        x: userLeft + userSize / 2,
        y: userTop + userSize / 2
      };
      var noteContainerWidth = this.dist(noteContainerStart, noteContainerEnd);
      var noteContainerLeft = noteContainerStart.x;
      var noteContainerTop = noteContainerStart.y - containerHeight / 2;
      var noteContainerStyle = {
        top: noteContainerTop + 'px',
        left: noteContainerLeft + 'px',
        width: noteContainerWidth + 'px',
        transform: 'rotateZ(' + currentAngle + 'deg)'
      };
      var noteContainerDiv = (<div
        key={'notecontainer'+userId}
        className='notecontainer'
        style={noteContainerStyle}>
        {userNotes}
        </div>);
      bubbleDivs.push(noteContainerDiv);

      currentAngle += degreesPerUser;
    }

    return bubbleDivs;
  },
  toRadians: function(angle) {
    return angle * (Math.PI / 180);
  },
  dist: function(c1, c2) {
    return Math.sqrt(
      Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2)
    );
  }
});
