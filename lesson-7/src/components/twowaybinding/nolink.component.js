import { Component } from "react";

class NoLink extends Component {
    constructor(props) {
        super(props)
        this.state = { message: 'No link component' }
    }
    handleChange = (event) => {
        this.setState({ message: event.target.value })
        console.log('NoLink state:', this.state)
    }
    render = () => {
        var msg = this.state.message;
        return <input type="text" value={msg} onChange={this.handleChange} />
    }
}

export default NoLink