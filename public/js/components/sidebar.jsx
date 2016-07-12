var React = require('react');
var LoopList = require('./loop-list.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      sidebarOpen: false
    }
  },
  render: function() {
    return (
      <div id='sidebar' className={this.state.sidebarOpen ? 'open' : 'closed'}>
        <div onClick={this.toggleSidebar} className='sidebar-toggle'></div>
        <div className='sidebar-content'>
          <LoopList
            onLoopChange={this.props.onLoopChange}
            loopList={this.props.loopList}
            openSequencer={this.props.openSequencer} />
        </div>
      </div>
    );
  },
  toggleSidebar: function() {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }
});
