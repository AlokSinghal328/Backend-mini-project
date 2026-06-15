const Router = require('express').Router;
const {newMessageAdd, getMessage}= require('../controllers/message.controller');

const router = Router();

router.route('/addMessage').post(newMessageAdd);
router.route('/m/:token').get(getMessage);

module.exports = router;