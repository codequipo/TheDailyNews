import React, { Component } from 'react'
import { getnewsbysources,getBookMarkedArticle,currentUser,addToBookmark } from './UserFuctions'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
import { MDBContainer,MDBModalFooter,MDBModalBody,MDBModalHeader,MDBModal,MDBRow,MDBIcon,MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ReactSnackBar from "react-js-snackbar";
//Detect changes
class Home extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      articles:[],
      page_url:'',
      modal13: false,
      summaryText:'',
      summaryImage:'',

      Show: false,
      Showing: false,
      message:'Hello There',
      zero:false
    }

    this.onChange = this.onChange.bind(this)
    this.addToBookmark = this.addToBookmark.bind(this)
  }

  toggle = k => () => {
    let modalNumber = 'modal' + '13'
    this.setState({
      modal13: !this.state.modal13,
      summaryText:this.state.articles[k].text,
      summaryImage:this.state.articles[k].top_image
    });
  }

  show = (message) => {
    if (this.state.Showing) return;

    this.setState({ Show: true, Showing: true,message:message });
    setTimeout(() => {
      this.setState({ Show: false, Showing: false });
    }, 2000);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentDidMount() {
    let page_url=this.props.history.location.pathname.split('/')[1]

    const resp=await currentUser()
    if(resp.status!=="success"){
      this.props.history.push(`/error`)
      return 
    }
    const curr=resp.user

    var final_string=""
    for(var i=0;i<curr.suscribed.length;i++){
      final_string=final_string.concat(curr.suscribed[i],',')
    }
    
    const data = {
      main_urls: final_string,
    }


    if(page_url=="home"){
      await getnewsbysources(data).then(res => {
        if(res.status=="success"){
            console.log(res.articles)
            if(res.articles.length==0){
              this.setState({
                zero:true
              })
            }
            this.setState({
              articles:res.articles,
              page_url:page_url
            })
        }
        else{
            this.props.history.push(`/error`)
        }
      })

    }
    else if(page_url=="bookmark"){

      await getBookMarkedArticle().then(res => {
        
        if(res.status=="success"){
            console.log(res.articles)
          this.setState({
              articles:res.articles,
              page_url:page_url
          })
        }
        else{
          this.props.history.push(`/error`)
          return
        }
      })
    }
  }

  async addToBookmark(e){
    var id=e.target.getAttribute('id')
    const result=await addToBookmark({id:id})
    console.log(result)
    if(result.status=="success"){
      this.show(result.message)
      
      
      //If it is bookmark page
      
      if(this.state.page_url=="bookmark"){
        console.log(result.bookmarks)
        this.setState({
          articles:result.bookmarks
        })
      }
      
    }
    else{
      this.show(result.message)
    }
    
  }
  

  render() {
    if (!localStorage.usertoken || localStorage.usertoken=="undefined"){
      return <Redirect
                to="/error"
              />;
    }
    if(this.state.zero==true){
      return(
        <h2 class="text-center">You have Not subscribed to any sources to yet. Follow the <a href="/OptionPage">link</a></h2>
      )
    }

    return (
      <div className="container">
        {
          
        this.state.articles.map((data,index)=>{
          
            if(index%3==0){
              console.log("mode3: "+index)

              return(
                <div className="container m-3 p-3 row" style={{backgroundColor:"#FFFFFF"}}>
                    



                    <MDBContainer>
                      <MDBRow>
                        {[index,index+1,index+2].map(k=>{
                          
                          if(k>=this.state.articles.length){
                            return
                          }
                          
                          return(
                            <MDBCol md='4'>
                              <MDBCard style={{height:"500px",width:"43vh"}}>
                                <MDBCardImage
                                  hover
                                  overlay='white-light'
                                  className='card-img-top'
                                  style={{height:"200px"}}
                                  src={this.state.articles[k].top_image} 
                                />

                                <MDBCardBody cascade className='text-center'>
                                  <MDBCardTitle className='card-title'>
                                    <strong>{this.state.articles[k].title}</strong>
                                  </MDBCardTitle>

                                  <p className='font-weight-bold blue-text'><a href={this.state.articles[k].main_url}>Main Link</a></p>

                                  <MDBCardText>
                                  <MDBIcon icon='quote-left' />{this.state.articles[k].main_url_key}{' '}<MDBIcon icon='quote-right' />
                                  </MDBCardText>

                                  <MDBCol md='20' className='d-flex justify-content-center'>
                                      <button
                                      
                                        onClick={(e) => {
                                          e.preventDefault();
                                          window.location.href=this.state.articles[k].url;
                                          }}
                                      
                                        
                                      type="button" class="btn btn-secondary">Article</button>
                                      
                                      <button onClick={this.toggle(k)} type="button" class="btn btn-primary">Summary</button>
                                      
                                  </MDBCol>

                                  <Button variant="contained"  color="primary" onClick={this.addToBookmark}>
                                    <MDBIcon far icon="bookmark"  id={this.state.articles[k]._id} />
                                  </Button>
                                </MDBCardBody>

                                <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
                                  <ul className='list-unstyled list-inline font-small'>
                                    <li className='list-inline-item pr-2 white-text'>
                                      <MDBIcon far icon='clock' /> {new Date(this.state.articles[k].createdAt).toDateString()}
                                    </li>
                                  </ul> 
                                </div>

                              </MDBCard>
                            </MDBCol>
                          )
                        })}
                      


                      </MDBRow>

                    </MDBContainer>






                </div>
              )
            }//if mode 3 statement end


        })}


      <MDBModal isOpen={this.state.modal13} toggle={this.toggle(0)}>
        
        <MDBModalHeader toggle={this.toggle(0)}>
          Summary
        </MDBModalHeader>
        <MDBModalBody>
          
        <img src={this.state.summaryImage} style={{width:"100%",height:"30vh"}}/>
          {this.state.summaryText}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle(0)}>
            Close
          </MDBBtn>
          
        </MDBModalFooter>
      </MDBModal>


        <div>
            <div>    
                <ReactSnackBar Icon={<MDBIcon icon="newspaper" />} Show={this.state.Show}>
                  {this.state.message}
                </ReactSnackBar>
            </div>
        </div>


        
      </div>





    )
  }
}

export default Home