import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/users";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.redirect = props.redirect;
    this.user = { username: "", password: "" };
  }
  login() {
    const { dispatch } = this.props;
    dispatch(login(this.user))
      .then(() => {

      })
      .catch(() => {});
  }
  render() {
    const { isLoggedIn, message } = this.props
    if(isLoggedIn) return <Redirect to="/profile"></Redirect>;
    return (
      <div>
        <h1>Đây là login page</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            this.user.username = e.target.value;
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            this.user.password = e.target.value;
          }}
        ></input>
        <input
          type="button"
          value="Login"
          onClick={() => {
            this.login();
          }}
        />
        {message && (<h4>{message}</h4>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.users;
  const { message } = state.message;
  return { isLoggedIn, message };
}

export default connect(mapStateToProps)(LoginComponent);
