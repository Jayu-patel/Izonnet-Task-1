const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router/todoRoute')

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=> res.send("server is running"))

app.use('/api',router)
app.listen(8000,()=>{
    console.log("server is running")
})