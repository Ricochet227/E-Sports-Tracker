import React from "react";
// import {Reactcomponent as logo} from '../../assets/react.svg'
class login extends React.Component {
  state = {
    email: "",
    pwd: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <div>
          <logo />
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="email..."
              required
              onChange={this.handlSubmit}
            />
            <input
              type="password"
              name="pwd"
              placeholder="password..."
              required
              onChange={this.handlSubmit}
            />
            <button onSubmit={this.handlSubmit}>Log in </button>
          </form>
        </div>
      </div>
    );
  }
}

export default login;
