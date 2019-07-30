import React, { Component } from "react";
import { Link } from "react-router-dom";
import CompanyModel from "../../model/company.model";
import InterviewModel from "../../model/interview.model";

export default class CompanyView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {},
      interviews: [],
      companyModel: new CompanyModel(this.props.match.params.id),
      interviewModel: new InterviewModel(null, this.props.match.params.id),
    };
  }

  componentDidMount() {
    this.state.companyModel
      .load()
      .then(model => this.setState({ model: model }))
      .catch(error => console.log(error));
    this.state.interviewModel
      .loadByCampaignId(this.props.match.params.id)
      .then(list => this.setState({ interviews: list }))
      .catch(error => console.log(error));      
  }

  render() {
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
        <table className="table">
          <thead className="thead-light">
            {this.state.companyModel.getTableHeader()}
          </thead>
          <tbody>{this.state.companyModel.getTableRow(this.state.model)}</tbody>
        </table>
        <h6>Interviews</h6>
        <table className="table">
          <thead className="thead-light">
            {this.state.interviewModel.getTableHeader()}
          </thead>
          
        </table>

        <div />
      </div>
    );
  }
}
