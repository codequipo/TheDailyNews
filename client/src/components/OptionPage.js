//Check heroku 
import React, { Component } from 'react'
import { allsourcesFun,getnewsbysources, suscribe,currentUser } from './UserFuctions'
import { Form, Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";

import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
import ReactSnackBar from "react-js-snackbar";
import { MDBBadge,MDBIcon,MDBRow,MDBCol,MDBContainer,MDBTable, MDBTableBody, MDBTableHead,MDBInput } from 'mdbreact';

class SelectPage extends Component {
  constructor() {
    super()
    this.state = {
        
        options: ['http://www.huffingtonpost.com', 'http://cnn.com', 'http://www.time.com', 'http://www.ted.com', 'http://pandodaily.com', 'http://www.cnbc.com', 'http://www.mlb.com', 'http://www.pcmag.com', 'http://www.foxnews.com', 'http://theatlantic.com', 'http://www.bbc.co.uk', 'http://www.vice.com', 'http://www.elle.com', 'http://www.vh1.com', 'http://espnf1.com', 'http://espn.com', 'http://www.npr.org', 'http://www.sfgate.com', 'http://www.glamour.com', 'http://www.whosdatedwho.com', 'http://kotaku.com', 'http://thebostonchannel.com', 'http://www.suntimes.com', 'http://www.businessinsider.com', 'http://www.rivals.com', 'http://thebusinessjournal.com', 'http://www.newrepublic.com', 'http://allthingsd.com', 'http://www.topgear.com', 'http://thecitizen.com', 'http://www.ign.com', 'http://www.sci-news.com', 'http://www.morningstar.com', 'http://www.variety.com', 'http://thebottomline.as.ucsb.edu', 'http://www.gamefaqs.com', 'http://blog.searchenginewatch.com', 'http://thedailyfairfield.com', 'http://www.solarnovus.com', 'http://medicalxpress.com', 'http://www.news.com.au', 'http://www.health.com', 'http://www.computerandvideogames.com', 'http://wsj.com', 'http://www.allure.com', 'http://www.theinsider.com', 'http://cnet.com', 'http://venturebeat.com', 'http://www.topspeed.com', 'http://thedailyworld.com', 'http://games.com', 'http://www.religionnews.com', 'http://blogs.berkeley.edu', 'http://www.sbnation.com', 'http://www.polygon.com', 'http://nytimes.com', 'http://www.thefrisky.com', 'http://telegram.com', 'http://yahoo.com', 'http://www.nbcnews.com', 'http://thedailypage.com', 'http://www.popsci.com', 'http://www.pbs.org', 'http://www.nasa.gov', 'http://www.guardiannews.com', 'http://www.weather.com', 'http://www.gq.com', 'http://www.etonline.com', 'http://telegraph.co.uk', 'http://www.fastcompany.com', 'http://www.infoworld.com', 'http://www.wired.com', 'http://www.pcgamer.com', 'http://sportingnews.com', 'http://theatlanticwire.com', 'http://thecarconnection.com', 'http://www.sun-sentinel.com', 'http://autoblog.com', 'http://www.environmentalleader.com', 'http://thecrimson.com', 'http://thecypresstimes.com', 'http://www.dailyfinance.com', 'http://www.politico.com', 'http://newsroom.fb.com', 'http://news.ycombinator.com', 'http://lifehacker.com', 'http://www.bet.com', 'http://independent.co.uk', 'http://www.mlssoccer.com', 'http://www.bodybuilding.com', 'http://www.cosmopolitan.com', 'http://www.apple.com', 'http://www.autonews.com', 'http://www.eonline.com', 'http://www.vanityfair.com', 'http://techdigest.tv', 'http://www.maximumpc.com', 'http://www.techradar.com', 'http://thedailyjournal.com', 'http://www.mlive.com', 'http://techworld.com.au', 'http://www.techmeme.com', 'http://thedailynewsegypt.com', 'http://thedailygrind.com.au', 'http://techcrunch.com', 'http://tehrantimes.com', 'http://www.hollywoodreporter.com', 'http://thedailysound.com', 'http://www.stltoday.com', 'http://deadspin.com', 'http://www.digitaltrends.com', 'http://seattletimes.com', 'http://seattlepi.com', 'http://www.cleveland.com', 'http://heritage.org', 'http://www.today.com', 'http://www.politifact.com', 'http://zdnet.com', 'http://www.nationalenquirer.com', 'http://egotastic.com', 'http://blogs.creativeloafing.com', 'http://townhall.com', 'http://www.eweek.com', 'http://www.vogue.co.uk', 'http://www.teenvogue.com', 'http://www.nypost.com', 'http://www.reuters.com', 'http://www.scientificamerican.com', 'http://www.miamiherald.com', 'http://www.nydailynews.com', 'http://www.newscientist.com', 'http://bigstory.ap.org', 'http://www.ebony.com', 'http://thedailystar.com', 'http://www.technologyreview.com', 'http://www.theverge.com', 'http://www.nba.com', 'http://www.cbssports.com', 'http://betabeat.com', 'http://www.tmz.com', 'http://tcnewsnet.com', 'http://www.latimes.com', 'http://www.c-span.org', 'http://www.style.com', 'http://www.peoplestylewatch.com', 'http://theboot.com', 'http://www.foxbusiness.com', 'http://www.pcworld.com', 'http://washingtontimes.com', 'http://thedailyreview.com', 'http://www.nfl.com', 'http://www.space.com', 'http://washingtontechnology.com', 'http://www.buzzfeed.com', 'http://inquirer.net', 'http://www.maxim.com', 'http://abcnews.com', 'http://www.extremetech.com', 'http://thedailytimes.com', 'http://mashable.com', 'http://washingtonexaminer.com', 'http://www.bhg.com', 'http://tech.mit.edu', 'http://hotair.com', 'http://www.1up.com', 'http://www.cbc.ca', 'http://gawker.com', 'http://celebuzz.com', 'http://sciencemag.org', 'http://www.rollingstone.com', 'http://slashdot.org', 'http://www.slate.com', 'http://bleacherreport.com', 'http://www.nascar.com', 'http://www.forbes.com', 'http://washingtonpost.com', 'http://nymag.com', 'http://www.microsoft.com', 'http://hbr.org', 'http://www.ft.com', 'http://www.dailymail.co.uk', 'http://www.theautochannel.com', 'http://g4tv.com', 'http://www.aljazeera.com', 'http://politicker.com', 'http://nbcsports.nbc.com', 'http://www.gamespot.com', 'http://news.sky.com', 'http://www.joystiq.com', 'http://www.escapistmagazine.com', 'http://www.thestreet.com', 'http://www.ew.com', 'http://www.nj.com', 'http://msn.com', 'http://thedailyreporter.com', 'http://www.economist.com', 'http://phys.org', 'http://www.glam.com', 'http://perezhilton.com', 'http://www.usmagazine.com', 'http://aol.com', 'http://www.cbsnews.com', 'http://www.tennis.com', 'http://washingtonian.com', 'http://www.sciencedaily.com', 'http://foxsports.com', 'http://www.popularmechanics.com', 'http://www.macworld.com', 'http://thinkprogress.org', 'http://www.mtv.com', 'http://discovery.com', 'http://www.people.com', 'http://thedailybeast.com', 'http://www.hollywood.com', 'http://medium.com', 'http://www.engadget.com', 'http://www.usnews.com', 'http://www.billboard.com', 'http://nationalgeographic.com', 'http://www.purseblog.com', 'http://www.giantbomb.com', 'http://www.automobilemag.com', 'http://thechronicle.com.au', 'http://tbnweekly.com', 'http://techreport.com', 'http://thedailyfix.com', 'http://www.animenewsnetwork.com', 'http://www.realclearpolitics.com', 'http://usatoday.com', 'http://www.techspot.com', 'http://discovermagazine.com', 'http://arstechnica.com', 'http://foreignpolicy.com', 'http://www.redstate.com', 'http://www.marketwatch.com', 'http://www.eurogamer.net', 'http://cbn.com', 'http://www.parade.com', 'http://www.bbcamerica.com', 'http://washingtonindependent.com', 'http://drudgereport.com', 'http://beta.na.leagueoflegends.com', 'https://aajtak.intoday.in/', 'https://www.hindustantimes.com', 'https://www.bhaskar.com/', 'https://news.ycombinator.com/', 'https://khabar.ndtv.com/', 'http://zeenews.india.com/hindi', 'https://www.jagran.com/'],
        checked:Array.from({ length: 249 }).fill(0),


        Show: false,
        Showing: false,
        message:'',
        allsources:[],
        display_sources:[]
    }

    this.onChange = this.onChange.bind(this)
    this.handleButtonClick=this.handleButtonClick.bind(this)
    this.changeOptionList=this.changeOptionList.bind(this)
  }

  
  async componentDidMount() {
    const resp=await currentUser()
    if(resp.status!="success"){
      this.props.history.push(`/error`)
    }

    const allsources=await allsourcesFun()
    if(allsources.status=="success"){
      this.setState({
        allsources:allsources.sources,
        display_sources:allsources.sources
      })
    }
    else if(allsources.status=="fail"){
      this.props.history.push(`/error`)
    }
    

    const curr=resp.user
    console.log('curr.suscribed:  '+curr.suscribed)
    var temp_checked=this.state.checked
    for(var i=0;i<curr.suscribed.length;i++){
        var index=this.state.options.indexOf(curr.suscribed[i])
        
        temp_checked[index]=1
    }
    this.setState({
        checked:temp_checked
    })
  }
  changeOptionList(e){
    const query=e.target.value
    if(query==""){
      this.setState({
        display_sources:this.state.allsources
      })
      return
    }

    let filterlist=this.state.allsources.filter((item)=>{
      if(item.url.toLowerCase().search(query.toLowerCase())!=-1){
        return item
      }
    })
    this.setState({
      display_sources:filterlist
    })

  }

  onChange(e) {
    
    
    console.log(e.target.value)
    console.log(e.target)

    
    let checked_temp=[]
    if (e.target.checked) {
        checked_temp=this.state.checked
        checked_temp[e.target.value]=1
        console.log("was nt checked")
    } else {
      checked_temp=this.state.checked
      checked_temp[e.target.value]=0
      console.log("was checked")
    }
    this.setState({ checked: checked_temp })    
  }

  async handleButtonClick(e){
        var selected_items=""
        var selected_list=[]
        for(var i=0;i<this.state.allsources.length;i++){
          if(this.state.checked[i]==1){
            selected_items=selected_items.concat(this.state.allsources[i].url,',')
            selected_list.push(this.state.allsources[i].url)
          }
        }
        if(selected_list.length<=3){
          this.show("Select Atleast 4 sources")
          return
        }
        

        console.log("final String: "+selected_items)
        let data={
            selected_items:selected_items,
            selected_list:selected_list
        }
        const result=await suscribe(data)
        if(result.status=="success"){
          this.show("Subscribed to "+selected_list.length+" sources successfully")
        }
        console.log(result)
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
    if (!localStorage.usertoken || localStorage.usertoken=="undefined"){
      return <Redirect
          to="/error"
          />;
    }
    return (
        <div className="container mt-4" style={{textAlign:"center"}}>




<Form className="m-4">  
  <Form.Group>
    <Form.Control onChange={this.changeOptionList} type="text" placeholder="Search..." />
  </Form.Group>
</Form>

<h1 class="m-2">Subscribe Page:<MDBBadge color="primary">{this.state.display_sources.length}</MDBBadge></h1>
<div className="container mt-4" style={{overflowY:"scroll",height:"80vh"}}>

<table class="table table-striped table-dark">
    <thead>
      <tr>
        <th>Index</th>
        <th>News Sources</th>
        <th>Status</th>
        <th>Key</th>
      </tr>
    </thead>
    <tbody>
      
    

      {this.state.display_sources.map((data,index)=>{
        return(
          <tr>
            <td>{data.index}</td>
            <td>{data.url}</td>
            <td>
              {this.state.checked[data.index]==0 && <input  type="checkbox"  onChange={this.onChange}  value={data.index}  />}
              {this.state.checked[data.index]==1 && <input type="checkbox"  onChange={this.onChange}  value={data.index}  checked />}
            </td>
            <td>
              {data.unique_id}
            </td>
          </tr> 
          )
      })}


      
    </tbody>
  </table>
  </div>

              
    
    <Button className="text-center" onClick={this.handleButtonClick}>
          Submit
    </Button>
        
        
        <div>    
            <ReactSnackBar Icon={<MDBIcon icon="newspaper" />} Show={this.state.Show}>
              {this.state.message}
            </ReactSnackBar>
        </div>  



<MDBContainer>
  <br></br>
  <h1>Your Subscribitions:</h1>
<div style={{overflowY:"scroll",height:"80vh",marginTop:"10vh"}}>
  
<table class="table table-striped table-dark">
    <thead>
      <tr>
        <th>Index</th>
        <th>News Sources</th>
        <th>Status</th>
        <th>Key</th>
      </tr>
    </thead>
    <tbody>
      
    {this.state.display_sources.map((data,index)=>{
        if(this.state.checked[data.index]==1){

        
        return(
          
          <tr>
            <td>{data.index}</td>
            <td>{data.url}</td>
            <td>
              
              <input type="checkbox"  onChange={this.onChange}  value={data.index}  checked />
            </td>
            <td>
              {data.unique_id}
            </td>
          </tr>
        
          )

        }

      })}


      
    </tbody>
  </table>
  </div>
  </MDBContainer>

    </div>
    





          
            
    )
  }
  
}

export default SelectPage