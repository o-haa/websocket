const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const webSocket = require('./socket')

app.use(express.urlencoded({extended:true,}))
app.use(express.json())

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true
})

app.get('/',(req,res)=>{
    res.render('index')
})

webSocket(app.listen(4000,()=>{
    console.log('socket server start')
}))