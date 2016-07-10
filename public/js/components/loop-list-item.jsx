var React = require('react');

module.exports = React.createClass({
  render: function() {
    var playingClass = '';
    var icon = <div className='icon play-button'></div>;
    if (this.props.loopPlaying) {
      playingClass = 'playing';
      icon = <div className='icon stop-button'></div>
    }
    return (
      <div onClick={this.toggleLoop} className={'loop-list-item ' + playingClass}>
        {icon}
        {this.props.name}
      </div>
    );
  },
  toggleLoop: function() {
    this.props.onLoopChange(!this.props.loopPlaying, this.props.name);
  }
});
