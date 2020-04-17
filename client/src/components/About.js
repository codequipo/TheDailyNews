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


      <div style={{textAlign:"center"}} className="container">

<div className="about-section">
  <h1>About Us</h1>
  <p>This project was made as Mini Project by Second year students of K.J. Somaiya</p>
  <p>This website basically fetches news from about 250 news sources and provides user short summary using <strong>Extractive text based summarization</strong></p>
</div>

<h2 style={{textAlign:"center"}}></h2>
<div className="row">


  <div className="column">
    <div className="card">
      <img src="https://assets.leetcode.com/users/xninjacoder/avatar_1550144758.png" alt="Jane" style={{width:"100%",height:"200px"}}/>
      <div className="container">
        <h3>Tushar Bapecha</h3>
        <p className="title">Developer</p>
        
        {/* <p>tushar.bapecha@somaiya.edu</p> */}
        <p><button 
        onClick={(e) => {
          e.preventDefault();
          window.location.href='https://github.com/tushargithub44';
          }}
        className="button">Contact</button></p>
      </div>
    </div>
  </div>
  
  <div className="column">
    <div className="card">
      <img src="https://assets.leetcode.com/users/xninjacoder/avatar_1550144758.png" alt="Jane" style={{width:"100%",height:"200px"}}/>
      <div className="container">
        <h3>Rugved Bongale</h3>
        <p className="title">Developer</p>
        
        {/* <p>rugved.bongale@somaiya.edu</p> */}
        <p><button
        onClick={(e) => {
          e.preventDefault();
          window.location.href='https://github.com/RugvedB';
          }}
         className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://assets.leetcode.com/users/xninjacoder/avatar_1550144758.png" alt="Jane" style={{width:"100%",height:"200px"}}/>
      <div className="container">
        <h3>Talha Chafekar</h3>
        <p className="title">Developer</p>
        
        {/* <p>talha.c@somaiya.edu</p> */}
        <p><button
        onClick={(e) => {
          e.preventDefault();
          window.location.href='https://github.com/talha1503';
          }}
         className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://assets.leetcode.com/users/xninjacoder/avatar_1550144758.png" alt="Jane" style={{width:"100%",height:"200px"}}/>
      <div className="container">
        <h3>Mayank C.</h3>
        <p className="title">Developer</p>
        
        {/* <p>mayank.chowdhary@somaiya.com</p> */}
        <p><button 
        onClick={(e) => {
          e.preventDefault();
          window.location.href='https://github.com/m607stars';
          }}
        className="button">Contact</button></p>
      </div>
    </div>
  </div>

  
</div>


      </div>
    )
  }
}

export default About


