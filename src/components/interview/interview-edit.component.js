import React, { Component } from "react";
import { Link } from "react-router-dom";
import CompanyModel from "../../model/company.model";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

export default class CompanyEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: {},
      companyModel: new CompanyModel(this.props.match.params.id)
    };
  }

  componentDidMount() {
    this.state.companyModel
      .load()
      .then(model => {
        this.setState({
          model: model
        });
      })
      .catch(error => console.log(error));
  }

  onChangeName = e => {
    const model = this.state.model;
    model.name = e.target.value;
    this.setState({ model: model });
  };

  onChangeUrl = e => {
    const model = this.state.model;
    model.url = e.target.value;
    this.setState({ model: model });
  };

  onChangeStatus = e => {
    const model = this.state.model;
    model.status = e.target.value;
    this.setState({ model: model });
  };

  onSubmit(e) {
    e.preventDefault();

    this.state.companyModel
      .save(this.props.match.params.id, this.state.model)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    const options = this.state.companyModel.getStatusList();
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Companies</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {this.state.model.name}
            </li>
          </ol>
        </nav>
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
            <label>Status:</label>
            <select
              ref="statusInput"
              className="form-control"
              value={this.state.model.status}
              onChange={this.onChangeStatus}
            >
              {options.map(option => (
                <option
                  key={option}
                  value={option}
                  selected={this.state.model.status === option}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="submit"
              value="Save Company Record"
              className="btn btn-primary"
            />
            &nbsp;
            <button
              className="btn btn-danger"
              onClick={() => {
                this.state.companyModel.delete();
              }}
            >
              Delete
            </button>
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
