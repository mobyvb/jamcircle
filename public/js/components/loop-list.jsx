var React = require('react');
var LoopListItem = require('./loop-list-item.jsx');

module.exports = React.createClass({
  render: function() {
    var loopList = this.props.loopList;
    var listItemElems = [];
    for (var i = 0; i < loopList.length; i++) {
      var nextLoop = loopList[i];
      var nextElem = <LoopListItem
        key={nextLoop.name}
        name={nextLoop.name}
        loopPlaying={nextLoop.playing}
        onLoopChange={this.props.onLoopChange} />;
      listItemElems.push(nextElem);
    }
    return (
      <div id='loop-list'>
        <h3>Loops</h3>
        {listItemElems}
        <div onClick={this.props.openSequencer}
          className='add-loop'>Add Loop</div>
      </div>
    );
  }
});
