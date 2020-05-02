import React, { Component } from 'react'
import { register } from './UserFuctions'
import { MDBIcon,toast,ToastContainer,MDBFreeBird, MDBInput, MDBCol, MDBRow, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer, MDBEdgeHeader } from "mdbreact";
import ReactSnackBar from "react-js-snackbar";




class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {},

      Show: false,
      Showing: false,
      message:''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
      if(res.status=="success"){
        this.props.history.push(`/login`)
      }
      else if(res.status=="fail"){
        this.show(res.message)
      }
      else{
        this.props.history.push(`/error`)
      }
      
      
    })
  }

  show = (message) => {
    console.log(message)
    if (this.state.Showing) return;

    this.setState({ Show: true, Showing: true,message:message });
    setTimeout(() => {
      this.setState({ Show: false, Showing: false });
    }, 2000);
  };

  render() {

    


    return (

<div style={{marginBottom:"20vh"}}>
      <MDBContainer className="m-3 mb-12" >
      <MDBEdgeHeader color="mdb-color darken-2"></MDBEdgeHeader>
      <MDBFreeBird>
        <MDBRow>
          <MDBCol md="8" lg="7" className="mx-auto float-none white z-depth-1 py-2 px-2">
            <MDBCardBody>


      <form onSubmit={this.onSubmit}>
        <p className="h4 text-center mb-4">Register</p>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          First Name
        </label>
        <input 
        type="text"  className="form-control" 
        name="first_name"
        placeholder="Enter your first name"
        value={this.state.first_name}
        onChange={this.onChange}
        />
        <br />

        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Last Name
        </label>
        <input 
        type="text"  className="form-control" 
        name="last_name"
        placeholder="Enter your lastname name"
        value={this.state.last_name}
        onChange={this.onChange}
        />
        <br />

        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Enter Mail
        </label>
        <input 
        type="email"  className="form-control" 
        name="email"
        placeholder="Enter email"
        value={this.state.email}
        onChange={this.onChange}
        />
        <br />
        
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Your password
        </label>
        <input
        type="password"  className="form-control" 
        name="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.onChange}
        />
        <div className="text-center mt-4">
          <button
                type="submit"
                className="btn btn-lg btn-primary "
              >
                Register!
              </button>
        </div>
      </form>


              <div className="my-2">
                <p style={{ fontWeight: "300", fontSize: "0.75rem" }}>:)</p>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBFreeBird>
    </MDBContainer>



        <div>
            <ReactSnackBar Icon={<MDBIcon icon="newspaper" />} Show={this.state.Show}>
              {this.state.message}
            </ReactSnackBar>
        </div>


    </div>



      
      
    )
  }
}

export default Register