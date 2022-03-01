const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "I am Prem Bhimavat, a programmer and welcome to my daily blog website. I am familiar with many programming languages and frameworks, but there are so many things out there to learn! Starting form 2022 I'll post a Blog once every month about the various technologies I learned and the projects I created.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[];

app.get("/",function(req,res){

  res.render("home",{
    homeStartingContent : homeStartingContent,
    posts : posts,
  });
  
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/compose",function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const postContent = {
    title : req.body.postHead,
    body : req.body.postBody
  };

  posts.push(postContent);

  res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  console.log("RF:"+requestedTitle);
  posts.forEach(function(element){
    const storedTitle = _.lowerCase(element.title);
    console.log(storedTitle);
    if( storedTitle === requestedTitle ){
      res.render("post",{
        title : element.title,
        body : element.body
      })
    }
  });

});

app.get("/:notfound",function(req,res){
  if(req.params.notfound != "/" || "/about" || "/contact" || "/compose"){
    res.render("notfound");
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
