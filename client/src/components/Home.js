import React, { Component } from 'react'
import { getnewsbysources,getBookMarkedArticle,currentUser,addToBookmark } from './UserFuctions'
// import { Button } from 'react-bootstrap'
import Button from '@material-ui/core/Button';



class Home extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      articles:[],
      page_url:''
    }

    this.onChange = this.onChange.bind(this)
    this.addToBookmark = this.addToBookmark.bind(this)
  }

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
    console.log('id:'+id)
    const result=await addToBookmark({id:id})
    console.log(result)
    if(result.status=="success"){
      console.log(result.message)

      
      
      //If it is bookmark page
      if(this.state.page_url=="bookmark"){
        this.setState({
          articles:result.bookmarks
        })
      }
      
    }
    else{
      console.log(result.message)
    }
    
  }
  

  render() {
    return (
      <div className="container">
        
        {this.state.articles.map((data,index)=>{
            return(
                <div className="m-3 p-3" style={{backgroundColor:"#c4b7b1"}}>
                    {/* <h1>Hey {index}</h1> */}
                    <p>{data.url}</p>
                    <p>{data.main_url}</p>
                    <p>{data.index}</p>
                    <p>{data.title}</p>
                    <p><strong>{data.text}</strong></p>
                    <img src={data.top_image} style={{ height:"100px",width:"100px" }} />
                    <p>{data.createdAt}</p>
                    <p>{data.updatedAt}</p>
                    <Button variant="contained" color="primary" id={data._id} onClick={this.addToBookmark}>
                      Bookmark
                    </Button>
                    


                </div>
            )
        })}






      </div>
    )
  }
}

export default Home