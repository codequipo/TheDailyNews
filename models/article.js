const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ArticleSchema=new Schema({
    url:{
        type:String,
        Default:'default_url'
    },
    main_url:{
        type:String,
        Default:'default_url'
    },
    index:{
        type:String,
        Default:'default_index'
    },
    title:{
        type:String,
        Default:'default_title'
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