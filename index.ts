import 'reflect-metadata';
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
import { AppDataSource } from './datasorce.js';
import { User } from './user.entity.js';

const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const PORT =8888;

app.get('/',(req,res)=>{
   res.sendFile(__dirname + '/public/index.html')
})

app.post('/',(req,res)=>{
res.send(req.body);
})




app.post("/users",async(req,res)=>{
   const {name,email}= req.body;
   const user=new User()
   user.name=name;
   user.email=email;
    
   const userRepository=AppDataSource.getRepository(User);
   const newUser=await userRepository.save(user);
   res.json(newUser);
})

app.get("/users",async(req,res)=>{
    const userRepository=AppDataSource.getRepository(User);
    const users=await userRepository.find();
    res.json(users);
})

app.get("/users/:id",async(req,res)=>{
    const {id}=req.params;
    const userRepository=AppDataSource.getRepository(User)
    const user=await userRepository.findOneBy({id:parseInt(id as string)});
    res.json(user);
})

app.put('/users/:id',async(req,res)=>{
    const {id}=req.params
    const {name,email}=req.body;
    const userRepository=AppDataSource.getRepository(User);
    const existingUser=await userRepository.findOneBy({id :parseInt(id)})
    existingUser!.name=name
    existingUser!.email=email;
    const updateUser=await userRepository.save(existingUser!)
    res.json(updateUser);
})

app.delete("/users/:id",async(req,res)=>{
    const {id}=req.params;
    const userRepository=AppDataSource.getRepository(User);
    await userRepository.delete(id)
    res.json({success:true})

})


app.listen(PORT,()=>{
    console.log("サーバが起動しました")
})

AppDataSource.initialize().then(()=>{
    console.log('データベースに接続しました')
})
.catch((error)=>console.log(error))