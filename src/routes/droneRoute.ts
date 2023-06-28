import express from 'express';
import  DroneController  from '../controllers/droneController';

const router = express.Router();
const droneController = new DroneController();

router.post('/', droneController.createDrone);
router.get('/:id', droneController.getDroneById);
router.get('/', droneController.getAllDrones);
router.put('/:id', droneController.updateDrone);
router.get('/by/state', droneController.getDronesByState);
router.delete('/:id', droneController.deleteDrone);

export default router;
