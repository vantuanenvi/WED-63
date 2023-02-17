import { Component } from 'react';
import './Table.css'
class TableHeaderRow extends Component {
  render() {
    return <tr><th>#</th><th></th><th>First Name</th><th>Last Name</th><th>Email</th><th>Password</th></tr>;
  }
}

class TableFooterRow extends Component {
  constructor(props) {
    super(props)
    this.data = props.data;
    this.selectedRows = props.selectedRows
  }
  render() {
    return <tr><th>Tổng số: {this.selectedRows.length}/{this.data.length}</th><th></th><th>First Name</th><th>Last Name</th><th>Email</th><th>Password</th></tr>;
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props)
    this.data = props.data;
    this.selectedRows = props.selectedRows
  }
  selectRow = (r) => {
    if (this.selectedRows.indexOf(r) >= 0) this.selectedRows = this.selectedRows.filter(t => t !== r)
    else this.selectedRows.push(r)
    console.log(this.selectedRows)
  }
  render() {
    return this.data.map((row) =>
      <tr>
        <td>{this.data.indexOf(row) + 1}</td><td><input type="checkbox" onChange={(e) => {
          this.selectRow(row);
        }}></input></td><td>{row.firstname}</td><td>{row.lastname}</td><td>{row.email}</td><td>{row.password}</td>
      </tr>
    );
  }
}

const Table = ({ data, selectedRows = [] }) => {
  return (
    <table>
      <thead>
        <TableHeaderRow />
      </thead>
      <tbody>
        <TableRow data={data} selectedRows={selectedRows} />
      </tbody>
      <tfoot>
        <TableFooterRow  data={data} selectedRows={selectedRows}></TableFooterRow>
      </tfoot>
    </table>
  );
}

export default Table