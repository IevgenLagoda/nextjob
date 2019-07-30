import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CompanyModel {
  constructor(id) {
    this.url = "http://localhost:5000";
    this.id = id;
    this.model = {};
    if (this.id) {
      this.load().then(model => (this.model = model));
    }
  }

  getModel() {
    return this.model;
  }

  getStatusList() {
    return [
      "Waiting for scheduling",
      "Scheduled",
      "Postponed",
      "Done: Waiting for the result",
      "Done: Reject",
      "Done: Offer",
    ];
  }

  loadAll() {
    return axios.get(`${this.url}/interview/`).then(response => {
      return response.data;
    });
  }

  loadByCampaignId(campaignId) {
    return axios.get(`${this.url}/interview/byCampaign/${campaignId}`).then(response => {
      return response.data;
    });
  }

  load(id) {
    if (!id) {
      id = this.id;
    }
    return axios.get(`${this.url}/interview/${id}`).then(response => {
      this.model = response.data;
      return this.model;
    });
  }

  save(id, model) {
    return axios.post(`${this.url}/interview/update/${id}`, model);
  }

  delete(id) {
    if (!id) {
      id = this.id;
    }
    return axios
      .delete(`${this.url}/interview/${id}`)
      .then(res => (window.location = "/"));
  }

  getTableHeader() {
    return (
      <tr>
        <th>Title</th>
        <th>Company</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    );
  }

  getTableRow(model) {
    if (!model) {
      model = this.model;
    }
    return (
      <tr key={model._id}>
        <td>{model.title}</td>
        <td>
          <Link to={"/company/view/" + model.companyId}>{model.companyName}</Link>
        </td>
        <td>{model.status ? <span>{model.status}</span> : "N/A"}</td>
        <td>
          <Link to={"/interview/edit/" + model._id}>
            <button className="btn btn-sm btn-info">Edit</button>
          </Link>
          &nbsp;
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              this.delete(model._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
