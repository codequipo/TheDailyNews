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
app.use(express.static(path.join(__dirname, "client", "build")))


var port = process.env.PORT



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




let minCount=0;
let currCount = minCount; // 0-248 and repeat
let numOfSources=1
let numOfArticlesPerSources=2
let num_of_sentences_in_summary=2

let maxCount=248 - numOfSources;

setInterval(function() {
    if(process.env.REPEAT=="TRUE"){ //This is added to control sever on-off status 
    
        console.log('start')
        try{
            axios.post(
                process.env.FLASK_URL+"/db", 
                { 
                    currCount:currCount%maxCount,
                    numOfSources,
                    numOfArticlesPerSources,
                    num_of_sentences_in_summary
                },
                config
            )
            
            .then(async function (response) {
                console.log('Received response')
                currCount++
                const sites=response.data.allsite
                const sites_key=response.data.allsite_key

                for(var z=0;z<sites.length;z++){

                
                    var limit=response.data.alldata[sites[z]]['length']
                    console.log("z:"+sites[z]+"  limit:"+limit)

                    

                    for(var i=limit-1;i>=0;i--){

                        const documentCount = await Article.countDocuments({});
                        console.log('documentCount:'+documentCount)   
                        
                        let article=new Article({
                            
                            main_url:sites[z],
                            main_url_key:sites_key[z],
                            url:response.data.alldata[sites[z]][i].url,
                            
                            title:response.data.alldata[sites[z]][i].title,
                            text:response.data.alldata[sites[z]][i].text,
                            top_image:response.data.alldata[sites[z]][i].top_image,
                            index:i.toString(),
                            unique_id:documentCount.toString(),

                        })
                        
                        
                        console.log("article.title:"+article.title)
                        
                        let resp=await article.save()
                        
                    }
                    console.log()
                    console.log('Will be Called after every 3 minutes!')
                }
            
            })
        }
        catch(err){
            console.log('error on server:'+err)
        }
    }
    else{
        console.log('Server is off')
    }

}, 180000)





//process.env.MONGO_DB_NAME
mongoose.connect('mongodb+srv://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@node-rest-shop-qoquv.mongodb.net/'+process.env.MONGO_DB_NAME+'?retryWrites=true&w=majority',{
    useNewUrlParser: true
})


//Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function() {
    console.log('Server is running on port: ' + process.env.PORT)
})
