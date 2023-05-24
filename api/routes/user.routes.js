const router = require('express').Router();
  
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//AUTH
//Iscription
router.post('/register', authController.signUp);

//Login
router.post('/login', authController.signIn);

//Logout
router.get('/logout', authController.logout);

// Affiche All Users 
router.get('/', userController.getAllUsers);

// Affiche un Users 
router.get('/:id', userController.userInfo);
// Mis a jours  un Users 
router.put('/:id', userController.updateUser);

// Supperimer un Users 
router.delete('/:id', userController.deleteUser);

module.exports = router;



