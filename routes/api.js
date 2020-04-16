const express = require('express')
const route = express.Router()
const cors = require('cors')
route.use(cors())
const axios=require('axios')
const Article=require('../models/article')
const Source=require('../models/source')
const checkAuth=require('./checkAuth')

var config = { headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
}



route.post('/getnewsbysources',async (req,res,next)=>{
    try{
        main_urls=req.body.main_urls.split(',')
        // console.log(main_urls)
        li=[]
        
        li=await Article.find()
        .where('main_url')
        .in(main_urls)
        .sort('-createdAt')
        .exec()

        
        return res.json({ status:'success',articles:li })
    }
    catch(err){
        return res.json({ status:'fail',error:err })
    }
})

route.post('/getSummary',async (req,res,next)=>{
  try{
      // main_urls=req.body.main_urls.split(',')
      // console.log(main_urls)
      
      
      const article=await Article.find({ unique_id:req.body.unique_id })


      
      return res.json({ status:'success',article:article })
  }
  catch(err){
      return res.json({ status:'fail',error:err })
  }
})


route.post('/suscribe',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })
    
    if(user){
        try{
                console.log(req.body)
                user.suscribed=req.body.selected_list
                await user.save()
  
                res.json({status:'success'})
              }
              catch(err){
                return res.json({status:'fail',Data:err})
              }
  
  
          }
        
      
    
  
      
      else{
        return res.json({status:'fail',Data:'No User'})
      }
  
      
  })

  route.post('/currentUser',checkAuth,async (req, res) => {
    
    

    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })
    
    if(user){
        try{
                
  
                res.json({status:'success',user:user})
              }
              catch(err){
                return res.json({status:'fail',Data:err})
              }
  
  
          }
        
      
    
  
      
      else{
        return res.json({status:'fail',Data:'No User'})
      }
  
      
  })

  
  route.post('/addToBookmark',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })
    
    if(user){
      if(!req.body.id){
        res.json({status:'failed',message:'Click Bookmark again'})
      }
        try{
                
                li=user.bookmarked
                
                console.log("Before  && id:"+req.body.id)
                console.log(li)
                console.log()
                var index=li.indexOf(req.body.id)
                if(index>-1){
                    li.splice(index,1)
                    user.bookmarked=li
                    await user.save()
                    const u=await User.findOne({
                        _id: decoded._id
                    }).select('bookmarked').populate('bookmarked').exec()
                    
                    
                    

                    res.json({status:'success',message:'Removed from Bookmarks',bookmarks:u.bookmarked})
                }
                else{
                    li.push(req.body.id)
                    user.bookmarked=li
                    await user.save()
                    const u=await User.findOne({
                        _id: decoded._id
                    }).select('bookmarked').populate('bookmarked').exec()
                    
                    res.json({status:'success',message:'Added to Bookmarks',bookmarks:u.bookmarked})
                }
                
              }
              catch(err){
                  console.log(err)
                return res.json({status:'fail',Data:err})
              }
  
  
          }
        
      
    
  
      
      else{
        return res.json({status:'fail',Data:'No User'})
      }
  
      
  })

  route.post('/getBookMarkedArticle',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({_id: decoded._id}).populate('bookmarked')
    
    if(user){
        try{
                
                return res.json({status:'success',articles:user.bookmarked})
                
              }
              catch(err){
                  console.log(err)
                return res.json({status:'fail',Data:err})
              }
  
  
          }
        
      
    
  
      
      else{
        return res.json({status:'fail',Data:'No User'})
      }
  
      
  })

  route.post('/allsources',async (req,res,next)=>{
    try{
        
        
        li=[]
        
        li=await Source.find({})

        
        return res.json({ status:'success',sources:li })
    }
    catch(err){
        return res.json({ status:'fail',error:err })
    }
})

module.exports=route