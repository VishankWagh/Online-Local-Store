import express from 'express';
import { UpdateUserController, getProfileController } from '../controllers/userController.js';

const router = express.Router();

router.get('/getprofile/:uname', getProfileController);
router.post('/updateuser/:uname', UpdateUserController);

export default router;
