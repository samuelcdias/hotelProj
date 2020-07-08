const express = require('express');
const router = express.Router();

const controller = require('../controllers/item_servico')

router.post('/', controller.novo)
router.get('/', controller.listar)
router.get('/:id', controller.obterUm)
router.get('/reserva/:id', controller.filtrarReserva)
router.put('/', controller.atualizar)
router.delete('/', controller.excluir)

module.exports = router