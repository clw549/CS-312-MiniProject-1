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