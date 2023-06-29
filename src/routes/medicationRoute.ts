import express from 'express';
import MedicationController from '../controllers/medicationController';

const router = express.Router();
const medicationController = new MedicationController();

router.post('/', medicationController.createMedication);
router.get('/:id', medicationController.getMedicationById);
router.get('/', medicationController.getAllMedications);
router.put('/:id', medicationController.updateMedication);
router.delete('/:id', medicationController.deleteMedication);

export default router;
