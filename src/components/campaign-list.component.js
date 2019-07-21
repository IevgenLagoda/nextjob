import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Campaign = props => (
  <tr>
    <td>Campaign Name</td>
    <td>Campaign Main Contact</td>
    <td>Status</td>
    <td>
      <Link to="/edit/1">edit</Link> | <a href="#">delete</a>
    </td>
  </tr>
)

export default class CampaignList extends Component {
  constructor(props) {
    super(props);

    this.state = {campaigns: []};
  }

  componentDidMount() {
    // Call API
  }

  deleteCampaign(id) {
    // Call API

    this.setState({
      campaigns: this.state.campaigns.filter(el => el._id !== id)
    })
  }

  campaignsList() {
    return this.state.campaigns.map(currentCampaign => {
      return <Campaign campaign={currentCampaign} deleteCampaigne={this.deleteCamapgin} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Campaigns</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Main contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.campaignsList() }
          </tbody>
        </table>
      </div>
    )
  }
}