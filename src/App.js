import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CompanyList from "./components/company/company-list.component";
import CompanyView from "./components/company/company-view.component";
import CompanyEdit from "./components/company/company-edit.component";
import CompanyCreate from "./components/company/company-create.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CompanyList} />
      <Route path="/company/view/:id" component={CompanyView} />
      <Route path="/company/edit/:id" component={CompanyEdit} />
      <Route path="/company/create" component={CompanyCreate} />
      </div>
    </Router>
  );
}

export default App;