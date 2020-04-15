import React, { Component } from 'react'
import { login } from './UserFuctions'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './About.css'
class About extends Component {
  constructor() {
    super()
  }


  render() {
    return (


      <div className="container">

<div className="about-section">
  <h1>About Us Page</h1>
  <p>Some text about who we are and what we do.</p>
  <p>Resize the browser window to see that this page is responsive by the way.</p>
</div>

<h2 style={{textAlign:"center"}}>Our Team</h2>
<div className="row">


  <div className="column">
    <div className="card">
      <img src="https://scontent.fbom10-1.fna.fbcdn.net/v/t31.0-8/p720x720/10479946_1503231103253462_829683252295770183_o.jpg?_nc_cat=101&_nc_sid=174925&_nc_ohc=f_VL8sI7UxAAX80WDT7&_nc_ht=scontent.fbom10-1.fna&_nc_tp=6&oh=8b8b358a2f12d993aad42f777aab0bcd&oe=5EBB10E3" alt="Jane" style={{width:"100%",height:"350px"}}/>
      <div className="container">
        <h2>Tushar Bapecha</h2>
        <p className="title">1811003</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>tushar.bapecha@somaiya.edu</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg" alt="Jane" style={{width:"100%",height:"350px"}}/>
      <div className="container">
        <h2>Jane Doe</h2>
        <p className="title">1811006</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>rugved.bongale@somaiya.edu</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://scontent.fbom10-1.fna.fbcdn.net/v/t31.0-8/s960x960/1556353_620488651343524_232078041_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=7Co8eCWwuY0AX-BKIea&_nc_ht=scontent.fbom10-1.fna&_nc_tp=7&oh=468ea57a647ffd8b76d9d367bb31a2f9&oe=5EBBC45E" alt="Jane" style={{width:"100%",height:"350px"}}/>
      <div className="container">
        <h2>Talha Chafekar</h2>
        <p className="title">1811007</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>talha.c@somaiya.edu</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://scontent.fbom10-1.fna.fbcdn.net/v/t31.0-8/s960x960/1074000_1512999872260699_1019771125_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=GTTohuqGlT8AX9rDHCV&_nc_ht=scontent.fbom10-1.fna&_nc_tp=7&oh=701fb9d193ef2ff04c294eac77806cdd&oe=5EBDDF5C" alt="Jane" style={{width:"100%",height:"350px"}}/>
      <div className="container">
        <h2>Mayank Chowdhary</h2>
        <p className="title">1811010</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mayank.chowdhary@somaiya.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  
</div>


      </div>
    )
  }
}

export default About


