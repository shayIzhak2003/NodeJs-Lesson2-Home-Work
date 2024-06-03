const express = require('express')
const server = express()
const port = 3000
const user = "shay shalom izhak"
server.get('/', (req,res) =>{
    res.json("hello world!")
})
server.get('/user', (req,res) =>{
    res.json(`hello world from ${user}!`)
})
server.listen(port, (res,req) =>{
    console.log(`server is running on port ${port}`)
})