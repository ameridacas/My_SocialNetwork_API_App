const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    deleteUser,
    getSingleUser
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;
