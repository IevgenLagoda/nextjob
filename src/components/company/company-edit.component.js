import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

export default class CompanyEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      url: '',
      status: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/company/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          url: response.data.url,
          status: response.data.status,
        })
      })
      .catch(error => console.log(error));
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

  deleteCompany() {
    axios.delete('http://localhost:5000/company/' + this.props.match.params.id)
      .then(response => console.log(response.data));

    window.location = '/';
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      name: this.state.name,
      url: this.state.url,
      status: this.state.status,
    }

    axios.post('http://localhost:5000/company/update/' + this.props.match.params.id, company)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    var options = [
      "Planned",
      "In Work",
      "Postponed",
    ];

    return (
      <div>
        <h3>Edit Company Record</h3>
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
            <label>Status:</label>
            <select ref="statusInput"
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}>
              {options.map(option =>
                <option value={option} selected={this.state.status == option}>{option}</option>
              )}
            </select>
          </div>

          <div>
            <input type="submit" value="Edit Company Record" className="btn btn-primary" />
            &nbsp;
            <button
              className="btn btn-danger"
              onClick={() => { this.deleteCompany() }}>
              Delete
            </button>
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