import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/NavbarComponent'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import SelectPage from './components/SelectPage'
import OptionPage from './components/OptionPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/bookmark" component={Home} />
            <Route exact path="/SelectPage" component={SelectPage} />
            <Route exact path="/OptionPage" component={OptionPage} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App