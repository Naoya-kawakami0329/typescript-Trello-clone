// import * as http from 'http';

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"content-Type":'text/plain; charset=utf-8'})
//     res.end('hello node.js')
// })

// const PORT=8888;
// server.listen(PORT,()=>{
//     console.log("サーバーが起動しました")
// })

import express from 'express'

const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const PORT =8888;

app.get('/',(req,res)=>{
   res.sendFile(__dirname + '/public/index.html')
})

app.get("/users/:id",(req,res)=>{
    res.send(`User id is ${req.params.id}.Name is ${req.query.name}`)
})

app.post('/',(req,res)=>{
res.send(req.body);
})

app.put("/users/:id",(req,res)=>{
    res.send(req.body)
})

app.delete("/users/:id",(req,res)=>{
    res.send(req.params.id);
})

app.listen(PORT,()=>{
    console.log("サーバが起動しました")
})