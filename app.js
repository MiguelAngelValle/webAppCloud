const fs = require('fs');
const express = require("express");
const cors = require('cors')
const app = express();

const port = process.env.PORT || 3000;

//load 
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());

app.listen(port, () => {
    console.log(`App listening at PORT:${port}`);
})