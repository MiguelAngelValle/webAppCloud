const router = require('express').Router()
const fs = require('fs')
const giftModel = require('../models/gift')

router.get('/', async (req, res) => {
    let list = await giftModel.find();   
    res.send(list);
})

router.get('/:name', async (req, res) => {
    console.log("Obteniendo regalo");
    console.log(req.params.name);
    if(req.params.name) {
        let doc = await giftModel.findOne({name: req.params.name});
        console.log("hola");
        res.status(200).send(doc);
    } else {
        res.status(400).send({error: "error al cargar"})
    }
})

router.put('/:name', async (req, res) => {
    if(req.params.name) {
        const query = {name: req.params.name};
        let doc = await giftModel.findOneAndUpdate(query, {$set: req.body}, {new: true, useFindAndModify: false})
        res.status(200).send(doc);
    } else {
        res.status(400).send({error: "error al actualizar"});
    }
})

router.post('/',  async (req, res) => {
    let {name, price, category, status, buyer, link, photo} = req.body;
    if(name && price && category && status && buyer && link && photo) {
        //let hash = bcrypt.hashSync(code);
        let doc = await giftModel.saveInfo({name, price, category, status, buyer, link, photo})
        if(doc && !doc.error) {
            res.status(201).send(doc)
        } else {
            res.status(400).send(doc)
        }
        return;
    }
    res.status(400).send({error: "faltan datos"})
})

router.delete('/:name', async (req, res) => {
    if(req.params.name) {
        const query = {name: req.params.name};
        await giftModel.findOneAndDelete(query);
        res.status(201).send({exito: 'se elimino el regalo'})
    } else {
        res.status(400).send(doc)
    }
    await giftModel.findOneAndDelete({error: "error al borrar"});
})

module.exports = router;