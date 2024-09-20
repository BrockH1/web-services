const routes = require('express').Router();

routes.get('/', (req, res, next) => {
    res.send('Brock Hoskins');
});

module.exports = routes;