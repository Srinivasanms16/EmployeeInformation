const express = require("express");

const server = express();

const port = process.env.PORT || 3000;

server.use(express.static(__dirname+"/dist/AngLifecycleHookChangeDet"));

server.get("/*",(req,res,next)=>{
    res.sendFile(__dirname+"//dist/AngLifecycleHookChangeDet/index.html")
})

server.listen(port,()=>{
    console.log(`server is listening at ${port}.......`)
})

