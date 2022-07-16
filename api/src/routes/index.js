const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const authRaza = require('./raza');
const authTemperamento = require('./temperamento');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', authRaza);
router.use('/temperaments', authTemperamento);

module.exports = router;