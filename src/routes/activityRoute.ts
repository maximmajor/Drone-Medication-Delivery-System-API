import express from 'express';
import  ActivityController  from '../controllers/activityController';

const router = express.Router();
const activityController = new ActivityController();

router.post('/:droneId', activityController.loadDrone);
// router.get('/:id', activityController.getMedicationById);
router.get('/', activityController.getAllActivity);
// router.put('/:id', activityController.updateMedication);
// router.delete('/:id', activityController.deleteMedication);

export default router;
