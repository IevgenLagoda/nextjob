import React, { Component } from 'react';
import axios from 'axios';
//import "react-datepicker/dist/react-datepicker.css";

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
    // API call - all related data, if needed.
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

    axios.post('http://localhost:5000/campaign/create', campaign)
      .then(res => console.log(res.data));

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