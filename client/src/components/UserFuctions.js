 
import axios from 'axios'

// const base_url=process.env.base_url || 'http://localhost:5005' || ""
const base_url=""

export const logUserOut = token =>{
  setTimeout(()=> localStorage.removeItem('usertoken'), 3600000)//1H
}

export const register = newUser => {
    return axios
      .post(base_url+'/users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
      })
      .then(response => {
        console.log(response.data)
        return response.data
      })
      .catch(err=>{
        return {'status':'fail'}
      })
  }

export const login = user => {
  console.log('login called')
    return axios
      .post(base_url+'/users/login', {
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
        return {'status':'fail'}
      })
  }

export const getnewsbysources = data => {
  return axios
    .post(base_url+'/api/getnewsbysources', {
      main_urls: data.main_urls,
      
    })
    .then(response => {
      
      return response.data
    })
    .catch(err => {
      console.log(err)
      return {'status':'fail'}
    })
}


export const addToBookmark = data => {
  return axios
    .post(base_url+'/api/addToBookmark', data,
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
      return {'status':'fail'}
    })
}

export const getBookMarkedArticle = ()=> {
  return axios
    .post(base_url+'/api/getBookMarkedArticle', {},
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
      return {'status':'fail'}
    })
}

export const suscribe=async(data)=>{
  try{
    const result=await axios.post(base_url+'/api/suscribe',data,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
      }
    }
    )
    return result.data
  }
  catch(err){
    return {'status':'fail'}
  }
}

export const currentUser=async()=>{
  try{
    const result=await axios.post(base_url+'/api/currentUser',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        
      }
    }
    )
    return result.data
  }
  catch(err){
    return {'status':'fail'}
  }
}

export const allsourcesFun=async()=>{
  try{
    const result=await axios.post(base_url+'/api/allsources',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        
      }
    }
    )
    return result.data
  }
  catch(err){
    return {'status':'fail'}
  }
}