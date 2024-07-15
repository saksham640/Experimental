const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 8080;
let Chat = require("./chatSchema");

app.set("view engnie","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:"true"}));

let reload = function(){
  window.location.reload();
}


main().then(()=>{console.log("connection to db successful");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://saksham:saksham12@cluster0.7jiaptp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
};

app.listen(port,()=>{
  console.log("server is On");
});

app.get("/",(req,res)=>{
  res.render("root.ejs");
});

app.get("/chats",async (req,res)=>{
  let chats = await Chat.find();
  res.render("chatView.ejs", {chats});
});

app.post("/chats",(req,res)=>{
  console.log(req.body);
  let newChat = new Chat({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
    created_at: new Date(),
  });
  newChat.save();
  res.render("submitPage.ejs");
  console.log(newChat);
});

app.get("/chats/new",(req,res)=>{
  res.render("newChat.ejs");
});

app.get(`/chats/edit/:id`,async (req,res)=>{
  console.log(req.params);
  let chatId = req.params.id;
  console.log(chatId);
  let selectedChat = await Chat.findById(chatId);
  console.log(selectedChat);
  res.render("editChat.ejs",{selectedChat});
});

app.post("/editSaved/:id",async (req,res)=>{
  console.log(req.body);
  let chatId = req.params.id;
  console.log(chatId);
  if(req.body.from != ''){
  await Chat.findByIdAndUpdate(chatId,{from: req.body.from});
  }
  if(req.body.to != ''){
  await Chat.findByIdAndUpdate(chatId,{to: req.body.to});
  }
  if(req.body.message != ''){
    await Chat.findByIdAndUpdate(chatId,{message: req.body.message});
  }
  res.render("submitPage.ejs");
});

app.get("/chats/delete/:id",async(req,res)=>{
  let chatId = req.params.id;
  await Chat.findByIdAndDelete(chatId);
  res.redirect("/chats");
});

