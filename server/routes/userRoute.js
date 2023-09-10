import express from 'express';
import { UpdateUserController, getNameController, getProfileController } from '../controllers/userController.js';

const router = express.Router();

router.get('/getprofile/:role/:uname', getProfileController);
router.post('/updateuser/:uname', UpdateUserController);
router.get("/getname/:uname", getNameController);

export default router;
