import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CompanyModel from '../../model/company.model';

export default class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyModel: new CompanyModel(),
      companies: [],
    };
  }

  componentDidMount() {
    this.state.companyModel.loadAll()
      .then(companies => {
        this.setState({ companies: companies })
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h3>Companies</h3>
        {(this.state.companies.length > 0) ? (
        <table className="table">
          <thead className="thead-light">
            {this.state.companyModel.getTableHeader()}
          </thead>
          <tbody>
          {
            this.state.companies.map(currentCompany =>
              this.state.companyModel.getTableRow(currentCompany))
          }
          </tbody>
        </table>
        ) : (
        <div>No companies so far...</div>
        )}
        <div>
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