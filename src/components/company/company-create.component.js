import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CompanyModel from "../../model/company.model";
//import "react-datepicker/dist/react-datepicker.css";

export default class CompanyCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: {},
      companyModel: new CompanyModel()
    };
  }

  componentDidMount() {
    // API call - all related data, if needed.
  }

  onChangeName = (e) => {
    const model = this.state.model;
    model.name = e.target.value
    this.setState({
      model: model
    });
  }

  onChangeUrl = (e) => {
    const model = this.state.model;
    model.url = e.target.value
    this.setState({
      model: model
    });
  }

  onChangeStatus = (e) => {
    const model = this.state.model;
    model.status = e.target.value
    this.setState({
      model: model
    });
  }

  onSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/company/create", this.state.model)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    // TODO: 1st options doesn't save by default.
    const statuses = this.state.companyModel.getStatusList();
    return (
      <div>
        <h3>Create New Company record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.model.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>
              Jobs URL (LinkedIn or another page with jobs listing):{" "}
            </label>
            <input
              type="url"
              className="form-control"
              value={this.state.model.url}
              onChange={this.onChangeUrl}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <select
              className="form-control"
              defaultValue={{ label: statuses[0], value: statuses[0] }}
              onChange={this.onChangeStatus}
            >
            {statuses.map(option => (
              <option
                key={option}  
                value={option}
              >
                {option}
              </option>
            ))}
            </select>
          </div>

          <div>
            <input
              type="submit"
              value="Create Company Record"
              className="btn btn-primary"
            />
            &nbsp;
            <Link to="/">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
