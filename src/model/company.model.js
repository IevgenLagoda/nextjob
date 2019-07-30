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
      "I'm just looking",
      "I want to join",
      "I'm looking for opportunities",
      "I'm waring for thier response",
      "Thye waiting for my response",
      "On hold",
      "In black list"
    ];
  }

  loadAll() {
    return axios.get(`${this.url}/company/`).then(response => {
      return response.data;
    });
  }

  load(id) {
    if (!id) {
      id = this.id;
    }
    return axios.get(`${this.url}/company/${id}`).then(response => {
      this.model = {
        _id: response.data._id,
        name: response.data.name,
        url: response.data.url,
        status: response.data.status
      };
      return this.model;
    });
  }

  save(id, model) {
    return axios.post(`${this.url}/company/update/${id}`, model);
  }

  delete(id) {
    if (!id) {
      id = this.id;
    }
    return axios
      .delete(`${this.url}/company/${id}`)
      .then(res => (window.location = "/"));
  }

  getTableHeader() {
    return (
      <tr>
        <th>Name</th>
        <th>Jobs URL</th>
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
        <td>
          <Link to={"/company/view/" + model._id}>{model.name}</Link>
        </td>
        <td>
          {model.url ? (
            <a href={model.url} target="_blank" rel="noopener noreferrer">
              Jobs
            </a>
          ) : (
            "N/A"
          )}
        </td>
        <td>{model.status ? <span>{model.status}</span> : "N/A"}</td>
        <td>
          <Link to={"/company/edit/" + model._id}>
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
