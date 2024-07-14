const express = require('express');

const router = express.Router();
const controller = require('../controllers/controller')


// ***************** GET REQUESTS ********************
router.get('/', controller.connection)

// ***************** POST REQUESTS ********************

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router 