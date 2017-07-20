import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Settings extends Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        <h2>Settings</h2>

        <label htmlFor="name"> Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={this.props.name}
          onChange={this.props.handleNameChange}
        />

        <label htmlFor="email"> Email Address: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={this.props.email}
          onChange={this.props.handleEmailChange}
        />

        <button type="submit" className="button">
          Save ->
        </button>
      </form>
    );
  }
}

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired
};

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      _id: ""
    };

    this.resetUserPassword = this.resetUserPassword.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentWillMount() {
    const token = this.props.token || null;

    if (token) {
      this.resetUserPassword(token);
    } else {
      this.getUserInfo();
    }
  }

  render() {
    return (
      <div className="inner">
        <Settings
          name={this.state.name}
          email={this.state.email}
          handleSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          handleEmailChange={this.handleEmailChange}
        />
      </div>
    );
  }

  getUserInfo() {
    axios({
      method: "post",
      url: "http://localhost:7777/account/get",
      data: {
        token: Auth.getToken()
      }
    })
      .then(response => {
        //user is authenticated
        this.setState({
          email: response.data.email,
          name: response.data.name,
          _id: response.data._id
        });
      })
      .catch(err => {
        //user failed to authenticate
      });
  }

  resetUserPassword(token) {
    axios({
      method: "post",
      url: "http://localhost:7777/account/reset/",
      data: { token }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:7777/account/update",
      data: {
        name: this.state.name,
        email: this.state.email,
        _id: this.state._id
      }
    })
      .then(response => {
        //success if response.data is object
        if (Checker.isObject(response.data)) {
          //use prop from Router.js to create flash message
          this.props.createFlashMessage({
            type: "success",
            text: "Your account has been updated!"
          });
        } else if (Checker.isArray(response.data)) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out

          //use prop from Router.js to create flash message
          this.props.createFlashMessage({
            type: "error",
            text: "Oops! Something didn't work. Please try again."
          });
        }
      })
      .catch(error => {
        this.props.createFlashMessage({
          type: "error",
          text: error
        });
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
}

Account.propTypes = {
  createFlashMessage: PropTypes.func.isRequired
};

module.exports = Account;
