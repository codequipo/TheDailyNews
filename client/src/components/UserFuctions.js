 
import axios from 'axios'

const port=5005

export const logUserOut = token =>{
  console.log('logUserOut called')
    setTimeout(()=> localStorage.removeItem('usertoken'), 3600000)//1H
}

export const register = newUser => {
    return axios
      .post('http://localhost:'+port+'/users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
      })
      .then(response => {
        console.log('Registered')
      })
  }

export const login = user => {
    return axios
      .post('http://localhost:'+port+'/users/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data.token)
        logUserOut()
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }

export const getnewsbysources = data => {
  return axios
    .post('http://localhost:'+port+'/api/getnewsbysources', {
      main_urls: data.main_urls,
      
    })
    .then(response => {
      
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const addToBookmark = data => {
  return axios
    .post('http://localhost:'+port+'/api/addToBookmark', data,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        
      }
    })
    .then(response => {
      
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getBookMarkedArticle = ()=> {
  return axios
    .post('http://localhost:'+port+'/api/getBookMarkedArticle', {},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        
      }
    })
    .then(response => {
      
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const suscribe=async(data)=>{
  const result=await axios.post('http://localhost:'+port+'/api/suscribe',data,
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      
    }
  }
  )
  return result.data
}

export const currentUser=async()=>{
  const result=await axios.post('http://localhost:'+port+'/api/currentUser',{},
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      
    }
  }
  )
  return result.data
}