import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// import axios from "axios";

import styles from "./MainNav.module.css";
import NavItems from "../../components/NavItems/NavItems";
import * as actions from "../../store/actions/index";

class MainNav extends Component {
  state = {
    stats: [
      { value: "1", displayValue: "Idea" },
      { value: "2", displayValue: "Research" },
      { value: "3", displayValue: "In-Progress" },
      { value: "4", displayValue: "Revision" },
      { value: "5", displayValue: "Finished" },
      { value: "6", displayValue: "Submitted" },
      { value: "7", displayValue: "Accepted" }
    ],
    statusFilter: "",
    typeFilter: ""
  };

  componentDidMount() {
    this.props.getProjectTypes();
    // i can't tell if this is bad or not; i have seen it done in some tutorials, but
    // i get weird errors about memory leaks (from this page i think) when i clear local storage
    // to 'log out'; rendering this function totally null
  }

  typeChangeHandler = event => {
    this.setState({
      typeFilter: event.target.value
    });
    console.log(this.state);
  };

  statusChangeHandler = event => {
    this.setState({
      statusFilter: event.target.value
    });
  };

  render() {
    let typesArray = this.props.types.map(type => {
      return (
        <li key={type.id} value={type.id}>
          <Link to={`/type/${type.typename}`}>{type.typename}</Link>
        </li>
      );
    });

    let statsArray = this.state.stats.map(status => {
      return (
        <li key={status.value} value={status.value} label={status.displayValue}>
          <Link to={`/status/${status.displayValue}`}>
            {status.displayValue}
          </Link>
        </li>
      );
    });

    return (
      <header className={styles.MainNav}>
        <section className={styles.NavTop}>
          <div className={styles.Welcome}>Hi, {this.props.name}</div>
          <div className={styles.deskTopOnly}>
            <NavItems
              isAuth={this.props.isAuth}
              stats={statsArray}
              types={typesArray}
              signOut={this.props.signOut}
              changeType={this.typeChangeHandler}
              changeStatus={this.statusChangeHandler}
            />
          </div>
        </section>
        <section className={styles.NavBottom}>
          <div className={styles.MainNavLogo} />
        </section>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authorized: state.auth.authorized,
    loading: state.auth.loading,
    name: state.auth.firstname,
    types: state.type.types,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes()),
    signOut: () => dispatch(actions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);
