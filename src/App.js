import logo from './logo.svg';
import './App.css';
 import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home, { CreateEmployeeComponent } from './components/CreateEmployeeComponent';
import Home1, { ListOfEmployeeComponent } from './components/ListOfEmployeeComponent';
import react from 'react';
import NotFound from './components/NotFound';
import Kk from './components/Todo';
import Todo from './components/Todo';
import Add from './components/Add';
import Edit from './components/Edit';
import Update from './components/Update';
//import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return ( <div className="App">
{/* 

<BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfEmployeeComponent />} />
        <Route path="/home" element={<CreateEmployeeComponent/>} />
      </Routes>
    </BrowserRouter>
 */}

  <Router>
  <Switch>
  <Route exact path="/" component={ListOfEmployeeComponent}>
      </Route>
      <Route exact path="/list" component={Todo}>
      </Route>
      <Route exact path="/employees" component={<ListOfEmployeeComponent/>}>
      <ListOfEmployeeComponent />
      </Route>
    <Route exact path="/kk" component={<Home/>}>
      <Home />
      </Route>
      <Route exact path="/kk1" component={Add}>
      </Route>
      <Route exact path="/edit/:id" component={Edit}>
      </Route>
      <Route exact path="/home" component={CreateEmployeeComponent}>
      </Route> 
      <Route component={<NotFound/>}>
      <NotFound />
      </Route>
  </Switch>   
  </Router>  
</div>
  );
}

export default App;
