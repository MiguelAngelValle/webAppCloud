const router = require('express').Router()
const fs = require('fs')
const bcrypt = require('bcryptjs')
const guestModel = require('../models/guest')
const validations = require('../middlewares/validaciones')

router.get('/', validations.estaAutenticado, async (req, res) => {
    let list = await guestModel.getGuests();   
    res.send(list);
}) 

router.get('/:email', async (req, res) => {
    if(req.params.email) {
        let doc = await guestModel.findOne({email: req.params.email});
        res.status(200).send(doc);
    } else {
        res.status(400).send({error: "error al cargar"})
    }
})

router.put('/:email', async (req, res) => {
    if(req.params.email) {
        const query = {email: req.params.email};
        let doc = await guestModel.findOneAndUpdate(query, {$set: req.body}, {new: true, useFindAndModify: false})
        res.status(200).send(doc);
    } else {
        res.status(400).send({error: "error al actualizar"});
    }
})

router.post('/',  async (req, res) => {
    let {firstName, lastName, email, companions, phone, relationship, photo, sex, instagram, facebook, assistance, role, code} = req.body;
    if(firstName && lastName && email && companions && phone && relationship && photo && sex && assistance && role && code) {
        let hash = bcrypt.hashSync(code);
        let doc = await guestModel.saveInfo({firstName, lastName, email, companions, phone, relationship, photo, sex, instagram, facebook, assistance, role, code:hash})
        if(doc && !doc.error) {
            res.status(201).send(doc)
        } else {
            res.status(400).send(doc)
        }
        return;
    }
    res.status(400).send({error: "faltan datos"})
})

router.delete('/:email', async (req, res) => {
    if(req.params.email) {
        const query = {email: req.params.email};
        await guestModel.findOneAndDelete(query);
        res.status(201).send({exito: 'se elimino al invitado'})
    } else {
        res.status(400).send(doc)
    }
    await guestModel.findOneAndDelete({error: "error al borrar"}); 
})

module.exports = router;