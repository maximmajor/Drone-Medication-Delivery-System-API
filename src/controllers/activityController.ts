import { Request, Response } from 'express';
import  {Medication}  from '../models/medicationModel';
import  MedicationService  from '../services/medicationService';
import ActivityService from '../services/activityService';
import { Activity } from '../models/activityModel';

class ActivityController {
  private medicationService: MedicationService;
  private ActivityService: ActivityService;

  constructor() {
    this.ActivityService = new ActivityService();
    this.medicationService = new MedicationService();
  }

  public loadDrone =  async  (req: Request, res: Response): Promise<void> => {
    try {
      const droneId: any = req.params.droneId;
     
      const activityData: any = req.body;
      
      const activity = await this.ActivityService.loadDrone(droneId, activityData);
      res.json(activity);
    } catch (error: any) {
      res.status(500).json( error.message );
    }
  }

  // public getMedicationById =  async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const medicationId: string = req.params.id;
  //     const medication = await this.medicationService.getMedicationById(medicationId);
  //     if (medication) {
  //       res.json(medication);
  //     } else {
  //       res.status(404).json({ error: 'Medication not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  public getAllActivity =  async (req: Request, res: Response): Promise<void> => {
    try {
      const getAllActivity = await this.ActivityService.getAllActivity();
      res.json(getAllActivity);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // public updateMedication =  async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const medicationId: any = req.params.id;
  //     const medicationData: Medication = req.body;
  //     const updatedMedication = await this.medicationService.updateMedication(medicationId, medicationData);
  //     if (updatedMedication) {
  //       res.json(updatedMedication);
  //     } else {
  //       res.status(404).json({ error: 'Medication not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  // public deleteMedication =  async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const medicationId: string = req.params.id;
  //     const deleted = await this.medicationService.deleteMedication(medicationId);
  //     if (deleted) {
  //       res.json({ message: 'Medication deleted successfully' });
  //     } else {
  //       res.status(404).json({ error: 'Medication not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }
}

export default ActivityController;