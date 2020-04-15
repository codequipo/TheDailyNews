import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import './common.css'


export default class Dropdown extends Component{

    constructor(props) {
        super(props);
    }
    
    render(){
       
        return(
            <div>
              
<div class="selectWrapper mt-2">
<select  name='Category'  onChange={this.props.parent.handleChangeDropdown}>
    {['http://www.huffingtonpost.com', 'http://cnn.com', 'http://www.time.com', 'http://www.ted.com', 'http://pandodaily.com']
    .map(link=>{
        return(
            <option name={link} value={link}>{link}</option>
        )
    })}
  
  
</select> 
</div>                



            </div>
        )
    }
}