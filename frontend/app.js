const express=require("express");
const app=express();
app.listen(3000,()=>{console.log("servidor activo")});

app.use(express.static(__dirname+"/public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/pagina.html");
})