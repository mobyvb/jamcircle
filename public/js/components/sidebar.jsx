var React = require('react');

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
      </div>
    );
  },
  toggleSidebar: function() {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }
});
