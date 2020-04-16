import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'

import Navbar from './components/NavbarComponent'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Error from './components/error'
import Page404 from './components/Page404'
import OptionPage from './components/OptionPage'
import Logout from './components/Logout'
import About from './components/About'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <div className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/bookmark" component={Home} />
              
              <Route exact path="/OptionPage" component={OptionPage} />
              <Route exact path="/Logout" component={Logout} />
              <Route exact path="/About" component={About} />
              <Route exact path="/error" component={Error} />
              {/* <Route exact path="/" component={Landing} /> */}
              
              {/* <Route component={Page404} /> */}
              <Route  component={Page404} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App