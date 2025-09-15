import express from "express";
import bodyParser from "body-parser";
import fs, { read } from "fs";

const app = express();
const port = 3000;


//set up express
//public folder holds public information (styling)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

//make express listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/", (req,res) => {
  body = req.body;
  console.log(body);
})

addToJsonFile(JSON.stringify({title:"Hello", content:"World!"}))

function makeJsonFile(data) {
  fs.writeFileSync("public/posts/posts.json", data);
}

function addToJsonFile(data) {
  fs.appendFile("public/posts/posts.json", data, (err)=>{
    if (err) console.log(err);
  });
}
readJsonFile()
function readJsonFile() {
  var data;

  data = fs.readFileSync("public/posts/posts.json","utf-8" , (err, data) => {
    if (err) console.error(err);
    else console.log(data); return data;
  })
  console.log(data)
  return data;
}