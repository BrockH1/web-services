const express = require('express');
// const routes = require('express').Router();
const router = express.Router();


// routes.get('/', (req, res, next) => {
//     res.send('Brock Hoskins');
// });

router.use('/contacts', require('./contacts'))

module.exports = router;
// module.exports = routes