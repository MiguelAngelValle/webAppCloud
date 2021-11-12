const router = require("express").Router();
const fs = require('fs')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const guestModel = require("../models/guest");
const validations = require('../middlewares/validaciones') 

router.post('/login', validations.validarLogin, async (req,res) => {
    console.log('api/login...')
    let guest = await guestModel.findOne({email: req.body.email});
    if(guest) {
        if(bcrypt.compareSync(req.body.code, guest.code)) {
            //generación del token
            let token = jwt.sign({email: guest.email}, 'weddingApp', {expiresIn: 60*20})
            console.log(token);
            res.send({token: token})
        } else {
            res.status(401).send({error: "codigo incorrecto"})
        }
    } else {
        res.status(404).send({error: "invitado no registrado"})
    }
})

router.get('/logout', (req, res) => {

})

module.exports = router;