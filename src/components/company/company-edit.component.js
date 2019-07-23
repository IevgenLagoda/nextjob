import React, { Component } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

export default class CompanyEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/company/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
        })
      })
      .catch(error => console.log(error));
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      name: this.state.name,
    }

    axios.post('http://localhost:5000/company/update/' + this.props.match.params.id, company)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Company Record</h3>
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
            <input type="submit" value="Edit Company Record" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}