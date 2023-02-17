var createReactClass = require('create-react-class');

var WithLink = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  handleChange: function(newValue) {
    this.setState({message: newValue});
  },
  render: function() {
    var valueLink = {
      value: this.state.message,
      requestChange: this.handleChange
    };
    return <input type="text" valueLink={valueLink} />;
  }
});


export default WithLink