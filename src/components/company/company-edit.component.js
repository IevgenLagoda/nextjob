import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CompanyModel from '../../model/company.model';
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
      companyModel: new CompanyModel(this.props.match.params.id),
    }
  }

  getInstance() {
    return this;
  }

  componentDidMount() {
    this.state.companyModel.load()
      .then(model => {
        this.setState({
          model: model
        })
      })
      .catch(error => console.log(error));
  }

  onChangeName(e) {
    const model = this.getInstance().state.model;
    model.name = e.target.value;
    this.setState({model: model});
  }

  onChangeUrl(e) {
    const model = this.getInstance().state.model;
    model.url = e.target.value;
    this.setState({model: model});
  }

  onChangeStatus(e) {
    const model = this.getInstance().state.model;
    model.status = e.target.value;
    this.setState({model: model});
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      name: this.state.model.name,
      url: this.state.model.url,
      status: this.state.model.status,
    }

    this.state.companyModel.save(this.props.match.params.id, company)
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
              value={this.state.model.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Jobs URL (LinkedIn or another page with jobs listing): </label>
            <input type="url"
              className="form-control"
              value={this.state.model.url}
              onChange={this.onChangeUrl}
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select ref="statusInput"
              className="form-control"
              value={this.state.model.status}
              onChange={this.onChangeStatus}>
              {options.map(option =>
                <option value={option} selected={this.state.model.status == option}>{option}</option>
              )}
            </select>
          </div>

          <div>
            <input type="submit" value="Save Company Record" className="btn btn-primary" />
            &nbsp;
            <button
              className="btn btn-danger"
              onClick={() => { this.state.companyModel.delete() }}>
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