import React, { Component } from 'react'
import { getnewsbysources,getBookMarkedArticle,currentUser,addToBookmark } from './UserFuctions'
// import { Button } from 'react-bootstrap'
import Button from '@material-ui/core/Button';

import news from './news.jpeg'

import { MDBContainer,MDBModalFooter,MDBModalBody,MDBModalHeader,MDBModal,MDBRow,MDBIcon,MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import ReactSnackBar from "react-js-snackbar";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      articles:[],
      page_url:'',
      indexlist:[],
      modal13: false,
      summaryText:'',

      Show: false,
      Showing: false,
      message:'Hello There'
    }

    this.onChange = this.onChange.bind(this)
    this.addToBookmark = this.addToBookmark.bind(this)
  }

  toggle = k => () => {
    let modalNumber = 'modal' + '13'
    this.setState({
      modal13: !this.state.modal13,
      summaryText:this.state.articles[k].text
    });
  }

  show = (message) => {
    console.log(message)
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
    console.log('page_url:'+page_url)

    const resp=await currentUser()
    const curr=resp.user
    console.log('curr.suscribed:  '+curr.suscribed)
    // var suscribed_string=curr.suscribed.join()
    // console.log(curr.suscribed_string)

    var final_string=""
    for(var i=0;i<curr.suscribed.length;i++){
      console.log(curr.suscribed[i])
      final_string=final_string.concat(curr.suscribed[i],',')
    }
    console.log('final_string:'+final_string)
    const data = {
      main_urls: final_string,
    }


    if(page_url=="home"){
      await getnewsbysources(data).then(res => {
        if(res.status=="success"){
            console.log(res.articles)
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
        console.log(res)
        if(res.status=="success"){
            console.log(res.articles)
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
  }

  async addToBookmark(e){
    var id=e.target.getAttribute('id')
    // var id=e.target.id
    console.log('id after bookmark:')
    console.log(id)
    const result=await addToBookmark({id:id})
    console.log(result)
    if(result.status=="success"){
      console.log(result.message)

      // if(result.status=="success"){
        this.show(result.message)
      // }
      
      
      //If it is bookmark page
      
      if(this.state.page_url=="bookmark"){
        console.log('start')
        console.log(result.bookmarks)
        console.log('end')
        this.setState({
          articles:result.bookmarks
        })
      }
      
    }
    else{
      console.log(result.message)
      this.show(result.message)
    }
    
  }
  

  render() {
    return (
      <div className="container">




        
        {
          
        this.state.articles.map((data,index)=>{
          // for(var i=0;i<this.state.articles.length;i++){
            if(index%3==0){
              console.log("mode3: "+index)
            
            return(
                <div className="container m-3 p-3 row" style={{backgroundColor:"#FFFFFF"}}>
                    {/* <h1>Hey {index}</h1> */}
                    {/* <p>{data.url}</p>
                    <p>{data.main_url}</p>
                    <p>{data.index}</p>
                    <p>{data.title}</p>
                    <p><strong>{data.text}</strong></p>
                    <img src={data.top_image} style={{ height:"100px",width:"100px" }} />
                    <p>{data.createdAt}</p>
                    <p>{data.updatedAt}</p>
                    <Button variant="contained" color="primary" id={data._id} onClick={this.addToBookmark}>
                      Bookmark
                    </Button> */}



<MDBContainer>
  <MDBRow>
  {/* {this.state.articles.length>=index+1 && this.setState({ indexlist:[index] })  }
  {this.state.articles.length>=index+2 && this.setState({ indexlist:[index,index+1] })  }
  {this.state.articles.length>=index+3 && this.setState({ indexlist:[index,index+1,index+2] })  }
   */}
  {[index,index+1,index+2].map(k=>{
    
    if(k>=this.state.articles.length){
      console.log(index+2+"   "+this.state.articles.length)
      return
    }
    console.log("index:"+k+"    "+this.state.articles[k]._id)
    return(
      <MDBCol md='4'>
        <MDBCard style={{height:"500px",width:"43vh"}}>
          <MDBCardImage
            hover
            overlay='white-light'
            className='card-img-top'
            style={{height:"200px"}}
            src={this.state.articles[k].top_image} 
            // alt="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
            // onerror={this.src="./news.jpeg"}
          />

          <MDBCardBody cascade className='text-center'>
            <MDBCardTitle className='card-title'>
              <strong>{this.state.articles[k].main_url.split('//')[1].split('.com')[0]}</strong>
            </MDBCardTitle>

            <p className='font-weight-bold blue-text'><a href={this.state.articles[k].main_url}>Main Link</a></p>

            <MDBCardText>
            <MDBIcon icon='quote-left' />{this.state.articles[k].title}{' '}<MDBIcon icon='quote-right' />
            </MDBCardText>

            <MDBCol md='20' className='d-flex justify-content-center'>
              
                {/* <MDBBtn href={this.state.articles[k].main_url} outline color="info">main</MDBBtn> */}
                {/* <MDBBtn href={this.state.articles[k].url}  color="default">url</MDBBtn> */}
                {/* <MDBBtn onClick={this.toggle(k)}  color="secondary">summary</MDBBtn>               */}
                <button
                
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href=this.state.articles[k].url;
                  }}
                
                  
                 type="button" class="btn btn-secondary">Article</button>
                
                <button onClick={this.toggle(k)} type="button" class="btn btn-info">Summary</button>
                
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
            
            <ReactSnackBar Icon={<span>🦄</span>} Show={this.state.Show}>
              {this.state.message}
            </ReactSnackBar>
        </div>  
    </div>


        
      </div>





    )
  }
}

export default Home