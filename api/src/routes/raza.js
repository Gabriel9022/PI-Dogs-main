const { Router } = require('express');
//const {Raza} = require('../models');
const router = Router();
const axios = require('axios');
const { getAllBreeds, idRaza, crearRaza } = require('../controllers/razaController');
const {API_KEY} = process.env;


router.get('/', getAllBreeds)

router.get('/:id', idRaza)

router.post('/', crearRaza)


module.exports = router;
