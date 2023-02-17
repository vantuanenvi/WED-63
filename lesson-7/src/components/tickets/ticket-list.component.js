import { Component } from "react";

export default class TicketListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }
    render() {
        return (<div><h1>Đây là danh sách tickets</h1><span>{this.state.date.toString()}</span></div>)
    }
}