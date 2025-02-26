const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const path = require("path");
const cors = require("cors");
const controller = require("./controller");
require('dotenv').config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    res.render("index");
});
app.post('/generate-qr', controller.generadorQR);

app.listen(port, ()=>{
    console.log(`aplicacion corriendo en ${process.env.BASE_URL}`);
});
