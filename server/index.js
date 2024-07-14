require('dotenv').config()
const express = require('express')
const cors=require('cors')
const app=express();
const router=require('./routers/router')
const connection =require('./db')

app.use(cors())
app.use(express.json())
app.use('/',router)

connection().then(()=>{

    app.listen(3001, () => {
        console.log('Server Connected');
    })
})