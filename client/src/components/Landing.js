import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

class Landing extends Component {
  constructor() {
    super()
  }

  

  render() {
    return (
      <div className="container">
      {/* <div className="jumbotron mt-5"> */}
        {/* <div className="col-sm-8 mx-auto">
          <h1 className="text-center">WELCOME to our app</h1>
        </div> */}

        <div style={{width:"100%",height:"90vh"}}>
            <img src="https://images.ctfassets.net/usf1vwtuqyxm/7fXyhJjGzQSY3H5CQ3In9J/214358267802ba5a0b4231cb41489175/MinaLima_The_Daily_Prophet_wallpaper.jpg?w=914" style={{width:"100%",height:"100%"}}/>
        </div>

      {/* </div> */}
    </div>
    )
  }



  
}

export default Landing