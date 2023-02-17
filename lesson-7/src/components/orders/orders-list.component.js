import { Component } from "react";
import OrderService from "../../services/orders.service";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from 'moment';
class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.service = new OrderService();
    this.state = {
      loading: true,
      orders: [],
    };
  }
  componentDidMount() {
    this.service.GetAll({}).then((res) => {
      console.log("orders", res);
      this.setState({
        loading: false,
        orders: res.data,
      });
    });
  }
  render() {
    const { loading, orders } = this.state;
    const {isLoggedIn} = this.props
    if(!isLoggedIn) return <Redirect to="/login" />;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <h1>Danh sách orders</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <OrderRow data={orders} />
          </tbody>
        </table>
      </div>
    );
  }
}

class OrderRow extends Component {
    constructor(props) {
        super(props)
        this.data = props.data;
    }
    render() {
        return this.data.map((row) =>
            <tr key={`${row._id}`}>
                <td>{this.data.indexOf(row) + 1}</td>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td>{row.quantity}</td>
                <td>{row.size}</td>
                <td>{moment(row.date).format('DD/MM/YYYY')}</td>
            </tr>
        );
    }
}

const mapStateToProps = (state) =>{
  const { isLoggedIn } = state.users;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(OrderComponent);