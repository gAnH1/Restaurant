import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Restaurant from './pages/Restaurant';
import Addrestaurant from './pages/Addrestaurant';
import Editrestaurant from './pages/Editrestaurant';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Restaurant} />
        <Route path="/add-restaurant" component={Addrestaurant} />
        <Route path="/edit-restaurant/:id" component={Editrestaurant} />
      </Switch>
    </Router>
  );
}

export default App;