import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Table from "./Table";
import ArtistListComponent from "./components/artists/artists-list.component";
import ArtistDetailComponent from "./components/artists/artist-detail.component";
import ContactListComponent from "./components/contacts/contact-list.component";
import LoginComponent from "./components/login/login.component";
import NoLink from "./components/twowaybinding/nolink.component";
import WithLink from "./components/twowaybinding/withlink.component";
import TicketListComponent from "./components/tickets/ticket-list.component";

import { Component } from "react";
import OrderComponent from "./components/orders/orders-list.component";
import { connect } from "react-redux";
import ProfileComponent from "./components/profile/profile.component";
import HomeComponent from "./components/home.component";
const users = [
  {
    email: "gowtham@outlook.com",
    firstname: "gowtham",
    lastname: "ss",
    password: "outlook010",
  },
  {
    email: "ss@ss.com",
    firstname: "ss",
    lastname: "ss",
    password: "ss",
  },
  {
    email: "gow@gow.com",
    firstname: "gow",
    lastname: "gow",
    password: "gow",
  },
  {
    email: "thanhhh@wow.com",
    firstname: "Ho Huu",
    lastname: "Thanh",
    password: "wow",
  },
];

// const App = () => <Table data={users} />;
// const App = () => <ArtistListComponent data={users} />;

//Two-way bidning components
// const App = () => {
//     return (
//         <div>
//             <NoLink></NoLink><WithLink></WithLink>
//         </div>)
// }

const getIsLoggedIn = () => {
  return sessionStorage.token && sessionStorage.token != null;
};

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (getIsLoggedIn()) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
  }
  checkAuthenticated = () => {
    var authenticated =
      sessionStorage.getItem("token") != null &&
      sessionStorage.getItem("token") !== "";

    return authenticated;
  };
  componentDidMount() {}

  componentWillUnmount() {
    sessionStorage.removeItem("token");
  }
  render() {
    return (
      <>
        <Router>
          <nav>
            <ul>
              <li key={"home"}>
                <Link to="/">Home</Link>
              </li>
              <li key={"artists"}>
                <Link to="/artists">Artist</Link>
              </li>
              <li key={"contacts"}>
                <Link to="/contacts">Contact</Link>
              </li>
              <li key={"tickets"}>
                <Link to="/tickets">Ticket</Link>
              </li>
              <li key={"orders"}>
                <Link to="/orders">Orders</Link>
              </li>
              <li key={"profile"}>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
          <Route
              exact
              path="/"
              component={HomeComponent}
            ></Route>
            <Route
              exact
              path="/orders"
              component={OrderComponent}
            ></Route>
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/profile" component={ProfileComponent}></Route>
        </Router>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state.users;
  return { users };
}

export default connect(mapStateToProps)(App);
