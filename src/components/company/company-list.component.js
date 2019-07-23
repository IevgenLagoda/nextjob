import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Company = props => (
  <tr>
    <td>{props.company.name}</td>
    <td>N/A</td>
    <td>N/A</td>
    <td>
      <Link to={"/company/edit/" + props.company._id}>
        <button className="btn btn-sm btn-info">
          Edit
        </button>
      </Link>
      &nbsp;
      <button
        className="btn btn-sm btn-danger"
        onClick={() => { props.deleteCompany(props.company._id) }}>
        Delete
      </button>
    </td>
  </tr>
)

export default class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.deleteCompany = this.deleteCompany.bind(this);

    this.state = { companies: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/company/')
      .then(response => {
        this.setState({ companies: response.data })
      })
      .catch(error => console.log(error));
  }

  deleteCompany(id) {
    axios.delete('http://localhost:5000/company/' + id)
      .then(response => console.log(response.data));

    this.setState({
      companies: this.state.companies.filter(el => el._id !== id)
    })
  }

  companyList() {
    return this.state.companies.map(currentCompany => {
      return <Company company={currentCompany} deleteCompany={this.deleteCompany} key={currentCompany._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Companies</h3>
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
            {this.companyList()}
          </tbody>
        </table>
        <div className="float-right">
          <Link to={"/company/create/"}>
            <button className="btn btn-primary">
              Create new Company Record
            </button>
          </Link>
        </div>
      </div>
    )
  }
}