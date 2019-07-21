import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Campaign = props => (
  <tr>
    <td>{props.campaign.name}</td>
    <td>N/A</td>
    <td>N/A</td>
    <td>
      <Link to={"/edit/" + props.campaign._id}>
        <button class="btn btn-sm btn-info">
          Edit
        </button>
      </Link>
      &nbsp;
      <button
        class="btn btn-sm btn-danger"
        onClick={() => { props.deleteCampaign(props.campaign._id) }}>
        Delete
      </button>
    </td>
  </tr>
)

export default class CampaignList extends Component {
  constructor(props) {
    super(props);

    this.deleteCampaign = this.deleteCampaign.bind(this);

    this.state = { campaigns: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/campaign/')
      .then(response => {
        this.setState({ campaigns: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCampaign(id) {
    axios.delete('http://localhost:5000/campaign/' + id)
      .then(response => {
        console.log(response.data)
      });

    this.setState({
      campaigns: this.state.campaigns.filter(el => el._id !== id)
    })
  }

  campaignsList() {
    return this.state.campaigns.map(currentCampaign => {
      return <Campaign campaign={currentCampaign} deleteCampaign={this.deleteCampaign} />;
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
            {this.campaignsList()}
          </tbody>
        </table>
        <div class="float-right">
          <Link to={"/create/"}>
            <button class="btn btn-primary">
              Create new Campaign
            </button>
          </Link>
        </div>
      </div>
    )
  }
}