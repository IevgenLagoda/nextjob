import React, { Component } from 'react';
import axios from 'axios';
//import "react-datepicker/dist/react-datepicker.css";

export default class CompanyCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
    }
  }

  componentDidMount() {
    // API call - all related data, if needed.
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      name: this.state.name,
    }

    axios.post('http://localhost:5000/company/create', company)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Company record</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Company Record" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}