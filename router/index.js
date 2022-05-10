const express = require("express")
const formatdistance = require('date-fns/formatDistanceToNow');
const router = express.Router()

//mongodb connection
const mongoose = require('mongoose')
const messagesSchema = require('./message');
const res = require("express/lib/response");
const message = require("./message");


const url = "mongodb+srv://m-001-student:m001-mongodb@sandbox.zoqk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection Error"))


router.get('/',(req,res,next)=>{
    //read data from database
    messagesSchema.find()
    .exec(function (err, list_messages) {
      if (err) { return next(err); }

      if(list_messages.length == 0){
          list_messages = [ {name : 'Author Name',
                            message : 'your message',
                            date: new Date()}
                        ]
        res.render('index',{title:"Mini Messageboard",messages:list_messages,format:formatdistance})
      }else{
        res.render('index',{title:"Mini Messageboard",messages:list_messages,format:formatdistance})

      }
    
    });
})

router.get('/new',(req,res,next)=>{
    res.render('form')
})

router.get('/delete',(req,res,next)=>{
    res.render('form1', {error:""})
})

router.post('/new',(req,res,next)=>{
    if(req.body){
        messagesSchema.create(
            {
            date:new Date(),
            name:req.body.messageAuthor,
            message:req.body.messageText
           })     
    }

    res.redirect('/')
})

router.post('/delete',(req,res)=>{
    
    if(req.body){
        
       if(req.body.adminPassword === "jass123"){
            messagesSchema.find( { name : req.body.messageAuthor})
            .exec(function(err,list_messages){
              
                if(err){ return next(err) } 

                if(list_messages.length == 0){
                    res.render('form1' ,{error : "author not find"})
                }else{
                    messagesSchema.deleteMany({name:req.body.messageAuthor})
                    .exec(function(err){
                        if(err) return next(err)
                    })
                    res.redirect('/')
                }
            });
       }else{
           res.render('form1',{error:"Password not matched"})
       }

    }
    else{
        console.log("Something wrong")
    }
    
})



module.exports = router