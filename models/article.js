const mongoose=require('mongoose')
const Schema=mongoose.Schema

const autoIncrement = require('mongoose-auto-increment');

const ArticleSchema=new Schema({
    url:{
        type:String,
        Default:'default_url'
    },
    main_url:{
        type:String,
        Default:'default_url'
    },
    main_url_key:{
        type:String,
        Default:'default_url_key'
    },
    title:{
        type:String,
        Default:'default_title'
    },
    index:{
        type:String,
        Default:'default_index'
    },
    unique_id:{
        type:String,
        unique:true
    },
    text:{
        type:String,
        Default:'default_text'
    },
    top_image:{
        type:String,
        Default:'default_top_image'
    }
},
{ timestamps: true }
)

module.exports=Article=mongoose.model('Article',ArticleSchema)