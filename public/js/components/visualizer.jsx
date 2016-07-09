var React = require('react');

module.exports = React.createClass({
  render: function() {
    var visWidth = document.getElementById('visualizer').offsetWidth;
    var userDivs = [];
    for (var i=0; i<this.props.users.length; i++) {
      var userId = this.props.users[i];
      var userNotes = [];
      var notesPlayingForUser = [];
      if (this.props.notesPlaying[userId]) {
        notesPlayingForUser = Object.keys(this.props.notesPlaying[userId]);
      }
      for (var j=0; j<notesPlayingForUser.length; j++) {
        var note = notesPlayingForUser[j];
        var letter = note.slice(0, -1).toLowerCase();
        userNotes.push(<li key={'usernotes'+note} className={'note ' + letter}>{note}</li>);
      }
      var userDiv = (<div key={'userinfo'+userId}><h2>{userId}</h2><ul>{userNotes}</ul></div>);
      userDivs.push(userDiv);
    }
    return (
      <div id="visualizer">
        <h1>Visualizer</h1>
        {userDivs}
      </div>
    );
  }
});
