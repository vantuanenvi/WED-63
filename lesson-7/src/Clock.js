import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        console.log('component did mount')
        this.setTimeRef = setInterval(() => this.setTime(), 2000);
    }
    componentDidUpdate() {
        console.log('component is updated')
    }
    componentWillUnmount() {
        console.log('component will unmount')
        clearInterval(this.setTimeRef)
    }

    render() {
        return (
            <div>
                <p>The current time is {this.state.date.toString()}</p>
            </div>
        );
    }

    setTime() {
        this.setState((state, props) => {
            console.log(state.date);
            return {
                date: new Date()
            }
        })
    }
}
export default Clock;