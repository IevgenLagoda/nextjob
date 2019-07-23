import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import "react-datepicker/dist/react-datepicker.css";

export default class CompanyCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      url: '',
      status: '',
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

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      name: this.state.name,
      url: this.state.url,
      status: this.state.status,
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
            <label>Jobs URL (LinkedIn or another page with jobs listing): </label>
            <input type="url"
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeUrl}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <select ref="statusInput"
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}>
              <option value="Planned">Planned</option>
              <option value="In Work">In Work</option>
              <option value="Postponed">Postponed</option>
            </select>
          </div>

          <div>
            <input type="submit" value="Create Company Record" className="btn btn-primary" />
            &nbsp;
            <Link to="/">
              <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}