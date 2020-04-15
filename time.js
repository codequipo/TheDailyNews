var request = require('request');
var express=require('express')
const app=express()
const axios=require('axios')

var config = { headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
}

const port = 3002

app.get('/', (req, res) => res.json({message:'Hello World!'}))




// var requestLoop = setInterval(function(){
    console.log('start')
    axios.post("http://0.0.0.0:8083/", 
             { label : "Test" , text : ""}  , config
          )
          .then(function (response) {
            // console.log(response.data.alldata);
            console.log('\n\n\n')
            console.log(response.data.alldata['http://cnn.com']['0'])
            console.log('\n\n\n')
            console.log(response.data.alldata['http://www.time.com']['0'])
            console.log('\n\n\n')
            console.log(response.data.alldata['http://www.bbc.co.uk']['0'].url)
            console.log('\n\n\n')
            console.log(response.data.alldata['http://www.bbc.co.uk']['0'].title)
            console.log('\n\n\n')
            console.log(response.data.alldata['http://www.bbc.co.uk']['0'].text)
          })
          .catch(function (error) {
            console.log(error);
          });
//   }, 10000);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))