// .env file
// MONGO_USERNAME=enter your mongo username
// MONGO_PASSWORD=enter your mongo password
// MONGO_DB_NAME=enter db name
// PORT=5003
// secretkey=enter secret key

var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const axios=require('axios')
require('dotenv').config()

// ... other imports 
const path = require("path")

// ... other app.use middleware 
//app.use(express.static(path.join(__dirname, "frontend", "build")))


var port = process.env.PORT
// console.log('process.env.PORT '+process.env.PORT)


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

var Api = require('./routes/api')
app.use('/api', Api)

var Users = require('./routes/User')
app.use('/users', Users)

var config = { headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
}

// setInterval(function() {
//     console.log('start')
//     axios.post("http://0.0.0.0:8087/", 
//              { label : "Test" , language : "en"}  , config
//           )
//           .then(async function (response) {
//             // console.log(response.data.alldata);
//             // const sites=['http://cnn.com','http://www.time.com','http://www.bbc.co.uk']
//             const sites=response.data.allsite
//             for(var z=0;z<sites.length;z++){

//                 // var max_articles_by_one_source=2
//                 var limit=response.data.alldata[sites[z]]['length']
//                 // console.log("response.data.alldata[sites[z]]['length'] : "+limit)
//                 // if(response.data.alldata[sites[z]]['length']>2){
//                 //     limit=2
//                 //     console.log("final limit  : "+limit)
//                 // }
//                 console.log("z:"+sites[z]+"  limit:"+limit)
//                 for(var i=limit-1;i>=0;i--){
                    
                    
//                     let article=new Article({
//                         main_url:sites[z],
//                         url:response.data.alldata[sites[z]][i].url,
//                         index:i.toString(),
//                         title:response.data.alldata[sites[z]][i].title,
//                         text:response.data.alldata[sites[z]][i].text,
//                         top_image:response.data.alldata[sites[z]][i].top_image,

//                     })
                    
                    
//                     console.log("article.title:"+article.title)
                    
                    
                    
                    
                    
//                     let resp=await article.save()
                    
//                 }
//                 console.log()
//             }
            
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
// }, 120000)





//process.env.MONGO_DB_NAME
mongoose.connect('mongodb+srv://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@node-rest-shop-qoquv.mongodb.net/'+process.env.MONGO_DB_NAME+'?retryWrites=true&w=majority',{
    useNewUrlParser: true
})


//Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

app.listen(port, function() {
    // console.log('Server is running on port: ' + port)
})