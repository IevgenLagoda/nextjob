import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import CampaignList from "./components/campaign-list.component";
import CampaignEdit from "./components/campaign-edit.component";
import CampaignCreate from "./components/campaign-create.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CampaignList} />
      <Route path="/edit/:id" component={CampaignEdit} />
      <Route path="/create" component={CampaignCreate} />
      </div>
    </Router>
  );
}

export default App;