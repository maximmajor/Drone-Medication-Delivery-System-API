import { Request, Response } from 'express';
import  {Medication}  from '../models/medicationModel';
import  MedicationService  from '../services/medicationService';

class MedicationController {
  private medicationService: MedicationService;

  constructor() {
    this.medicationService = new MedicationService();
  }

  public async createMedication(req: Request, res: Response): Promise<void> {
    try {
      const medicationData: Medication = req.body;
      console.log(medicationData)
      const medication = await this.medicationService.createMedication(medicationData);
      res.json(medication);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getMedicationById(req: Request, res: Response): Promise<void> {
    try {
      const medicationId: string = req.params.id;
      const medication = await this.medicationService.getMedicationById(medicationId);
      if (medication) {
        res.json(medication);
      } else {
        res.status(404).json({ error: 'Medication not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getAllMedications(req: Request, res: Response): Promise<void> {
    try {
      const medications = await this.medicationService.getAllMedications();
      res.json(medications);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async updateMedication(req: Request, res: Response): Promise<void> {
    try {
      const medicationId: any = req.params.id;
      const medicationData: Medication = req.body;
      const updatedMedication = await this.medicationService.updateMedication(medicationId, medicationData);
      if (updatedMedication) {
        res.json(updatedMedication);
      } else {
        res.status(404).json({ error: 'Medication not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async deleteMedication(req: Request, res: Response): Promise<void> {
    try {
      const medicationId: string = req.params.id;
      const deleted = await this.medicationService.deleteMedication(medicationId);
      if (deleted) {
        res.json({ message: 'Medication deleted successfully' });
      } else {
        res.status(404).json({ error: 'Medication not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default MedicationController;