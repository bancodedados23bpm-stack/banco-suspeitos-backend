const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/suspeitosController');
const { auth, permit } = require('../middlewares/auth');

router.get('/', auth, ctrl.listarTodos);
router.get('/:id', auth, ctrl.visualizarUm);
router.post('/', auth, permit('editor'), ctrl.criar);
router.put('/:id', auth, permit('editor'), ctrl.editar);
router.delete('/:id', auth, permit('editor'), ctrl.deletar);

module.exports = router;
