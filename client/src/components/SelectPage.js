import React, { Component } from 'react'
import { getnewsbysources } from './UserFuctions'
import { Form, Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import Dropdown from './Dropdown'

class SelectPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      articles:[]
    }

    this.onChange = this.onChange.bind(this)
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  async componentDidMount() {
    
  }

  async handleChangeDropdown(event) {
    this.setState({country: event.target.value});
    console.log(event.target.value)
    const data = {
        main_urls: event.target.value,
      }
  
      await getnewsbysources(data).then(res => {
        if(res.status=="success"){
            console.log(res.articles)
          this.setState({
              articles:res.articles
          })
        }
        else{
            this.props.history.push(`/error`)
        }
      })
    }

  render() {
    return (
      <div className="container">
        
            <div>
                
                <Dropdown parent={this}/>
<div class="row">
                {this.state.articles.map((data,index)=>{
                    return(

<div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={data.top_image} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{data.title}</h5>
    <p className="card-text">{data.text}</p>
    <strong className="card-text">{new Date(data.createdAt).toGMTString()}</strong>
    <a href={data.url} className="btn btn-primary">ArticleLink</a>
    <a href={data.main_url} className="btn btn-primary">MainLink</a>
  </div>
</div>                      
                        // <div className="m-3 p-3" style={{backgroundColor:"#c4b7b1"}}>
                        //     {/* <h1>Hey {index}</h1> */}
                        //     <p>{data.url}</p>
                        //     <p>{data.main_url}</p>
                        //     <p>{data.index}</p>
                        //     <p>{data.title}</p>
                        //     <p><strong>{data.text}</strong></p>
                        //     <img src={data.top_image} style={{ height:"100px",width:"100px" }} />
                        //     <p>{data.createdAt}</p>
                        //     <p>{data.updatedAt}</p>
                            


                        // </div>
                    )
                })}    
                </div>
            </div>        
      </div>
    )
  }
  
}

export default SelectPage