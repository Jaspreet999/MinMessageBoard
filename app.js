const express = require('express')
const indexRoutes  = require('./router/index')
const app = express()
//set view
app.set("view engine",'ejs')

//port 
const port = (process.env.PORT || 9001)

app.use(express.json())
app.use(express.urlencoded(
   { extended:false}
))

app.use(express.static('public'))
app.use('/',indexRoutes)

app.listen( port,(req,res)=>{
    console.log("server is working at " +port)
})
