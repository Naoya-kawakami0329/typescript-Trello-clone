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
const PORT =8888;

app.get('/',(req,res)=>{
    res.send("HELLO webserver");
})

app.listen(PORT,()=>{
    console.log("サーバが起動しました")
})