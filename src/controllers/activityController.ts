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



  public getAllActivity =  async (req: Request, res: Response): Promise<void> => {
    try {
      const getAllActivity = await this.ActivityService.getAllActivity();
      res.json(getAllActivity);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default ActivityController;