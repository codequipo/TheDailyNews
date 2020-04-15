const express = require('express')
const route = express.Router()
const cors = require('cors')
route.use(cors())
const axios=require('axios')
const Article=require('../models/article')
const checkAuth=require('./checkAuth')

var config = { headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
}


// route.get('/',(req,res,next)=>{
//     axios.post("http://0.0.0.0:8086/", 
//              { label : "Test" , language : "en"}  , config
//           )
//           .then(async function (response) {
//             // console.log(response.data.alldata);
//             const sites=['http://cnn.com','http://www.time.com','http://www.bbc.co.uk']
//             for(var z=0;z<sites.length;z++){

//                 var max_articles_by_one_source=2
//                 var limit=response.data.alldata[sites[z]]['length']
//                 if(response.data.alldata[sites[z]]['length']>2){
//                     limit=2
//                 }
//                 console.log("response.data.alldata[sites[z]]['length'] : "+limit)
//                 for(var i=limit-1;i>=0;i--){
//                     console.log("z:"+z+"  i:"+i)

//                     const documentCount = await Article.countDocuments({});
//                     //console.log( "Number of users:", documentCount );

//                     let article=new Article({
//                         unique_id:documentCount,
//                         main_url:sites[z],
//                         url:response.data.alldata[sites[z]][i.toString()].url,
//                         index:i.toString(),
//                         title:response.data.alldata[sites[z]][i.toString()].title,
//                         text:response.data.alldata[sites[z]][i.toString()].text,
//                         top_image:response.data.alldata[sites[z]][i.toString()].top_image,

//                     })
                    
//                     let resp=await article.save()
                    
//                 }
//             }
            
//           })
//           .catch(function (error) {
//             console.log(error);
//           });

//     res.send("HeyLo")
// })


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
        res.json({status:'failed',message:'Id not received'})
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
                    
                    
                    

                    res.json({status:'success',message:'Removed',bookmarks:u.bookmarked})
                }
                else{
                    li.push(req.body.id)
                    user.bookmarked=li
                    await user.save()
                    const u=await User.findOne({
                        _id: decoded._id
                    }).select('bookmarked').populate('bookmarked').exec()
                    
                    res.json({status:'success',message:'Added',bookmarks:u.bookmarked})
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

module.exports=route