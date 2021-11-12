const fs = require('fs');
const express = require("express");
const authRouter = require('./routes/auth-route')
const guestRouter = require('./routes/guest-route')
const giftRouter = require('./routes/gift-route')
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
app.use('/api/auth', authRouter);
app.use('/api/guest', guestRouter);
app.use('/api/gift', giftRouter);

app.listen(port, () => {
    console.log(`App listening at PORT:${port}`);
})