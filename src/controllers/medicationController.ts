import { Request, Response } from 'express';
import { Medication } from '../models/medicationModel';
import MedicationService from '../services/medicationService';
import { HttpException } from '../middlewares/HttpException';
import { medicationSchema } from '../middlewares/joiValidation';

class MedicationController {
  private medicationService: MedicationService;

  constructor() {
    this.medicationService = new MedicationService();
  }

  public createMedication = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error, value } = medicationSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
      }
      const medication = await this.medicationService.createMedication(value);
      res.status(200).json(medication);
      return
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(200).json(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }

  public getMedicationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const medicationId: string = req.params.id;
      const medication = await this.medicationService.getMedicationById(medicationId);
      if (medication) {
        res.status(200).json(medication);
      } else {
        res.status(404).json({ error: 'Medication does not exist in the database' });
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }

  public getAllMedications = async (req: Request, res: Response): Promise<void> => {
    try {
      const medications = await this.medicationService.getAllMedications();
      res.status(200).json({ medications });
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }

  public updateMedication = async (req: Request, res: Response): Promise<void> => {
    try {
      const medicationId: any = req.params.id;
      const medicationData: Medication = req.body;
      const updatedMedication = await this.medicationService.updateMedication(medicationId, medicationData);
      if (updatedMedication) {
        res.status(200).json(updatedMedication);
      } else {
        res.status(404).json({ error: 'Medication not found' });
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }

  public deleteMedication = async (req: Request, res: Response): Promise<void> => {
    try {
      const medicationId: string = req.params.id;
      const deleted = await this.medicationService.deleteMedication(medicationId);
      if (deleted) {
        res.status(200).json({ message: 'Medication deleted successfully' });
      } else {
        res.status(404).json({ error: 'Medication not found' });
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }
}

export default MedicationController;