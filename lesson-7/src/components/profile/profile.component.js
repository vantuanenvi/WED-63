import { connect } from "react-redux";
import moment from 'moment';
import { Redirect } from "react-router-dom";
const { Component } = require("react");

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) return <Redirect to="/login" />;
    const { user } = this.props;
    const { myOrders } = this.props;
    console.log(myOrders);
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td colSpan={6}>Profile</td>
            </tr>
            <tr>
              <td>Firstname:</td>
              <td>{user.firstname}</td>
            </tr>
            <tr>
              <td>Lastname:</td>
              <td>{user.lastname}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td colSpan={6}>My Orders</td>
            </tr>
            <OrderRow data={myOrders}></OrderRow>
          </tbody>
        </table>
      </>
    );
  }
}

class OrderRow extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  render() {
    return this.data.map((row) => (
      <tr key={`${row._id}`}>
        <td>{this.data.indexOf(row) + 1}</td>
        <td>{row.name}</td>
        <td>{row.price}</td>
        <td>{row.quantity}</td>
        <td>{row.size}</td>
        <td>{moment(row.date).format('DD/MM/YYYY')}</td>
      </tr>
    ));
  }
}

function mapStateToProps(state) {
  const { isLoggedIn, user, myOrders } = state.users;
  return { isLoggedIn, user, myOrders };
}

export default connect(mapStateToProps)(ProfileComponent);
