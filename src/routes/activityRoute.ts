import express from 'express';
import  ActivityController  from '../controllers/activityController';

const router = express.Router();
const activityController = new ActivityController();
router.post('/:droneId', activityController.loadDrone);
router.get('/', activityController.getAllActivity);;

export default router;
