const express = require('express');                                        
const router = express.Router();                                            

const auth = require('../middleware/auth');                                
const multer = require('../middleware/multer-config');                     
const sauceControllers = require('../controllers/sauces');

// Routes  + multer
router.get('/', auth, sauceControllers.getAllSauces);
router.get('/:id', auth, sauceControllers.getOneSauce);
router.post('/', auth, multer, sauceControllers.createSauce);
//router.post('/:id/like', auth, multer, sauceControllers.addLikeDislike);
router.put('/:id', auth, multer, sauceControllers.modifySauce);
router.delete('/:id', auth, sauceControllers.deleteSauce);
router.post("/:id/like", auth, sauceControllers.likeDislike);

module.exports = router;