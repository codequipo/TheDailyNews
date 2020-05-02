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

        li=[]
        
        li=await Article.find()
        .where('main_url')
        .in(main_urls)
        .sort('-createdAt')
        .exec()
        

        
        return res.json({ status:'success',articles:li,message:"" })
    }
    catch(err){
        return res.json({ status:'fail',error:err,message:"" })
    }
})
//Android
route.post('/getnewsbysourcesAndroid',checkAuth,async (req,res,next)=>{
  try{
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })

    if(user){
      const main_urls=await user.suscribed
      console.log("main_urls:"+main_urls)
      // main_urls=req.body.main_urls.split(',')
      // console.log(main_urls)
      li=[]
      
      li=await Article.find()
      .where('main_url')
      .in(main_urls)
      .sort('-createdAt')
      .exec()
      
      
      return res.json({ status:'success',articles:li,message:"" })
    }
    else{
      return res.json({ status:'fail',error:"User Does Not exist.Login Again.",message:"" })
    }
  }
  catch(err){
      return res.json({ status:'fail',error:err,message:"" })
  }
})

route.post('/getSummary',async (req,res,next)=>{
  try{
    const article=await Article.find({ unique_id:req.body.unique_id })      
    return res.json({ status:'success',article:article,message:"" })
  }
  catch(err){
    return res.json({ status:'fail',error:err,message:"" })
  }
})


route.post('/suscribe',checkAuth,async (req, res) => {
    try{
      decoded=req.decoded
      const user=await User.findOne({
        _id: decoded._id
      })
    
      if(user){
          try{
            const listofsources=[]
                  if(req.body.Android=="Android"){
                    stringlist=req.body.selected_list.split(',')
                  }
                  else{
                    stringlist=req.body.selected_list
                  }
                  
                  
                  user.suscribed=stringlist
                  await user.save()
    
                  res.json({status:'success',message:""})
                }
                catch(err){
                  return res.json({status:'fail',Data:err,message:""})
                }
            }
      else{
        return res.json({status:'fail',Data:'No User',message:""})
      }
    }  
    catch(err){
      return res.json({status:'fail',Data:err,message:""})
    }
      
  })

  route.post('/currentUser',checkAuth,async (req, res) => {
    
    
    try{
      decoded=req.decoded
      const user=await User.findOne({
        _id: decoded._id
      })
      
      if(user){
        try{
          return res.json({status:'success',user:user,message:""})
        }
        catch(err){
          return res.json({status:'fail',Data:err,message:""})
        }
      }      
      else{
        return res.json({status:'fail',Data:'No User',message:""})
      }
    }
    catch(err){
      return res.json({status:'fail',Data:err,message:""})
    }
      
  })

  
  route.post('/addToBookmark',checkAuth,async (req, res) => {
    
    try{
      decoded=req.decoded
      const user=await User.findOne({
        _id: decoded._id
      })
      
      if(user){
        if(!req.body.id){
          return res.json({status:'failed',message:'Click Bookmark again'})
        }
        try{
                
          li=user.bookmarked
          
          var index=li.indexOf(req.body.id)
          
          if(index>-1){
              li.splice(index,1)
              user.bookmarked=li
              await user.save()
              const u=await User.findOne({
                  _id: decoded._id
              }).select('bookmarked').populate('bookmarked').exec()

              return res.json({status:'success',message:'Removed from Bookmarks',bookmarks:u.bookmarked})
          }
          else{
              li.push(req.body.id)
              user.bookmarked=li
              await user.save()
              const u=await User.findOne({
                  _id: decoded._id
              }).select('bookmarked').populate('bookmarked').exec()
              console.log("after"+li)
              return res.json({status:'success',message:'Added to Bookmarks',bookmarks:u.bookmarked})
          }
                  
        }
        catch(err){
            console.log(err)
          return res.json({status:'fail',Data:err,message:""})
        }
      }      
      else{
        return res.json({status:'fail',Data:'No User',message:""})
      }
  }
  catch(err)
  {
    return res.json({status:'fail',Data:err,message:""})
  }
  
      
  })

  route.post('/getBookMarkedArticle',checkAuth,async (req, res) => {
    try{
      decoded=req.decoded
      const user=await User.findOne({_id: decoded._id}).populate('bookmarked')
      
      if(user){
          try{
            return res.json({status:'success',articles:user.bookmarked,message:""})
          }
          catch(err){
            return res.json({status:'fail',Data:err,message:""})
          }
      }  
      else{
        return res.json({status:'fail',Data:'No User',message:""})
      }
    }
    catch(err){
      return res.json({status:'fail',Data:err,message:""})
    }
      
  })

  route.post('/allsources',async (req,res,next)=>{
    try{
      li=[]
      li=await Source.find({})
      return res.json({ status:'success',sources:li,message:"" })
    }
    catch(err){
      return res.json({ status:'fail',error:err,message:"" })
    }
  })

module.exports=route