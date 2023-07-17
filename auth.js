const express = require("express");
const jwt = require("jsonwebtoken");


const app = express();


app.get('/api', (req,res)=>{
    res.json({
        message: 'welcome to api'
    })
})

app.post('/api/posts', verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
        res.sendStatus(403);
    }else{
        
    res.json({
        message:"Post created..",
        authData
    })
}
})
})
app.post('/api/login', (req,res)=>{
   // mock user
   const user ={
    id:1,
    username:'brad',
    email:'brad@gmail.com'
   }

  jwt.sign({user}, 'secretkey', {expiresIn : '30s'} ,(err,token) =>{
    res.json({
        token
    })
  })  
})


//verify tocken
function verifyToken(req,res,next){
// get auth values
const bearerHeader = req.headers['authorization'];
// if bearer is undefine

if(typeof bearerHeader !== 'undefined'){

const bearer = bearerHeader.split(' ');

// token from array

const bearerToken = bearer[1];

//set token

req.token = bearerToken;

//next midlleware
next()



}else{
    res.sendStatus(403);
}


}


app.listen(5000, ()=> console.log('Server started on 5000'))