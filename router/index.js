const express = require("express")
const formatdistance = require('date-fns/formatDistanceToNow');
const router = express.Router()

//mongodb connection
const mongoose = require('mongoose')
const messagesSchema = require('./message')
mongoose.connect("mongodb+srv://m-001-student:m001-mongodb@sandbox.zoqk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error',console.error.bind(console,"Connection error"))

let messagesRecieved = []

async function run(req,res,next){
    
    messagesRecieved =  await messagesSchema.find() 
    next()

}


// const messages = [ 
//     {name : "Jaspreet",
//     message:"Hi there",
//     date:new Date()
//     },
//     {name : "Shivansh",
//     message:"My suggestion to all college friends that you should ignore the current trend of our college",
//     date:new Date()
//     },
// ]

router.get('/',run,(req,res,next)=>{
    
    res.render('index',{title:"Mini Messageboard",messages:messagesRecieved,format:formatdistance})
})

router.get('/new',(req,res,next)=>{
    res.render('form')
})



router.post('/new',(req,res,next)=>{

    if(req.body){
        messagesSchema.create(
            {
            date:new Date(),
            name:req.body.messageAuthor,
            message:req.body.messageText
           })
           run()
           
    }

    res.redirect('/')
})

module.exports = router