import express from 'express';
import {userRequest,ownerRequest,updateDB,getCars} from '../controllers/mainController.js'
const router = express.Router();

router.route("/rent").post(userRequest);
router.route('/ownerReq').post(ownerRequest);
router.route("/ownerReq/approve").post(updateDB);
router.route("/ownerReq/deny").post(updateDB);
router.route("/userCars").post(getCars);


export default router;