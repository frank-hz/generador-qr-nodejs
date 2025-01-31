const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const path = require("path");
const cors = require("cors");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port, ()=>{
    console.log("app live in "+port);
})
