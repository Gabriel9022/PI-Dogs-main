const { Router } = require('express');
const {Temperamento} = require('../db');
const router = Router();
const axios = require('axios');
const {API_KEY} = process.env;

router.get('/', async (req, res) =>{
    try {
        const temp = await Temperamento.findAll()
        res.json(temp)
    }
    catch(e){
        res.send('Ocurrió un problema al traer los temperamentos')
    }
})

module.exports = router;
