const jwt = require('jsonwebtoken')

function validarLogin(req, res, next) {
    let {email, code} = req.body;
    if(email && code) {
        next();
    } else {
        res.status(400).send({error: "faltan datos"})
    }
}


function validarBodyGuest(req, res, next) { ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    let {firstname, lastName, email, companions, phone, relationship, photo, sex, instagram, facebook, assistance} = req.body
    if(firstname && lastName && email && companions && phone && relationship && photo && sex && assistance) {
        next();
        return;
    }
    res.status(400).send({error: "Hacen falta datos"});
}

function estaAutenticado(req, res, next) {
    let token =  req.get('x-auth');
    if(token) {
        jwt.verify(token, 'weddingApp', (err, decoded) => {
            if(err) {
                console.log(err.name);
                res.status(401).send({error: "Token no válido"})   
            } else {
                console.log(decoded);
                req.code = decoded.code;
                next();
            }
        })
    } else {
        res.status(401).send({error: "falta token"})
    } 
}

module.exports = {validarLogin, validarBodyGuest, estaAutenticado};