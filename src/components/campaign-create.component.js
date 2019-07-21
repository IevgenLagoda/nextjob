import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CampaignCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
    }
  }

  componentDidMount() {
    // API call
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const campaign = {
      name: this.state.name,
    }

    // API call

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Campaign record</h3>
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
          <input type="submit" value="Create Campaign Record" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}