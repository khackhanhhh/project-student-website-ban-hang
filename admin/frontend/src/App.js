import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login.component";
import Routers from "./layout/route.conponent"
import Signup from './components/Login/Signup.component';
function App() {
  return (
    <div className="">
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/" component={Routers} />
        <Route path="/signup" component={Signup} />
      </Router>
    </div>


  );
}

export default App;
