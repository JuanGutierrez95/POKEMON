const { Router } = require("express");

const typesRouter = Router();

const {
    getTypes
} = require('../controllers/typesController');

typesRouter.get('/', getTypes )

module.exports = typesRouter;