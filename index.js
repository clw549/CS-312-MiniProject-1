import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;


//set up express
//public folder holds public information (styling)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  var post
  var posts = readJsonFile();
  res.render("index.ejs", {posts:posts});
});

//make express listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/", (req,res) => {
  var newPost = req.body;

  var posts = readJsonFile();

  posts.push(newPost);

  makeJsonFile(posts);
  res.render("index.ejs", {posts:posts});
})

//how to edit post is to use a get request (using html)
app.get("/edit", (req,res) => {
  //const id = parseInt(req.query["id"]);
  console.log(req)
  const id = req.query["id"]

  console.log(id)

  var posts = readJsonFile();
    
  res.render("edit.ejs", {post:posts[id], id:id})
})

app.post("/edit", (req,res) => {
  var updatePost = req.query;
  const id = parseInt(req.query["id"])

  var posts = readJsonFile();

  posts[id] = updatePost;

  makeJsonFile(posts);
  //making posts a key allows for easier handling (for me)
    //notice how I love modular things (too much)
  res.render("index.ejs", {posts:posts});
})


app.post("/delete", (req,res) => {
  const id = parseInt(req.body["id"]);
  console.log(id)

  var posts = readJsonFile()
  const numbPostsDel = 1
  var deletedPost;
  deletedPost = posts.splice(id, numbPostsDel);

  // for (index in posts) {

  //   //this is to edit data so that the running id is not messed 
  //   // up by deleting a post

  //   // interesting behaviour I abuse is not adding {} when I want the next "line" to occur after an if or loop. (like this)
  //   if(posts[index]) // does this if true (exists in this context) =>
  //   if(postDeleted) {
  //     posts[index]["id"] = index-1;
  //   }
  //   else if (posts[index]["id"] == id) {
  //     postDeleted = true;
  //   } //end of "line" for if statement (wild)
    
  // }

  console.log(posts)
  makeJsonFile(posts)

  res.render("index.ejs", {posts:posts});
})

function makeJsonFile(data) {
  fs.writeFileSync("public/posts/posts.json", JSON.stringify(data));
}

function readJsonFile() {
  var data;

  data = fs.readFileSync("public/posts/posts.json","utf-8" , (err, data) => {
    if (err) console.error(err);
    else console.log(data); return data;
  })
  return JSON.parse(data);
}