import React,{ Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from 'react-bootstrap'


class Logout extends Component {
   
    render() {
        localStorage.removeItem('usertoken')
        if(!localStorage.usertoken){
            return (
                <div className="App">
                   <Alert variant="success">
                           You have successfully logged out.
                   </Alert>        
               </div>
               );
        }
    }
}

export default Logout;