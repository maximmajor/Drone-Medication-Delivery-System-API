import { Request, Response } from 'express';
import  {Drone}  from '../models/droneModel';
import  droneService from '../services/droneService'
import { registerDroneSchema } from '../middlewares/joiValidation';
import { HttpException } from '../middlewares/HttpException';
console.log(droneService)
 class DroneController {
  private DroneService: droneService;

  constructor() {
    this.DroneService = new droneService();
  }

  public createDrone = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error, value } = registerDroneSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return
    }
    //   const droneData = req.body;
    //  console.log(droneData)
     const createDrone = await this.DroneService.createDrone(value)
      console.log("hmmmmm", createDrone)
      res.json(createDrone);
    } catch (error: any) {

        res.status(500).json( error.message);
    
    }
  }

  public getDroneById = async (req: Request, res: Response): Promise<void> => {
    try {
      const droneId: string = req.params.id;
      const drone = await this.DroneService.getDroneById(droneId);
      if (drone) {
        res.json(drone);
      } else {
        res.status(404).json({ error: 'Drone not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public getAllDrones = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("me")
      const drones = await this.DroneService.getAllDrones();
      res.json(drones);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public updateDrone = async (req: Request, res: Response): Promise<void> => {
    try {
      const droneId: any = req.params.id;
      const droneData: Drone = req.body;
      const updatedDrone = await this.DroneService.updateDrone(droneId, droneData);
      if (updatedDrone) {
        res.json(updatedDrone);
      } else {
        res.status(404).json({ error: 'Drone not found' });
      }
    } catch (error: any) {
      res.status(500).json( error.error)
       };
    }


    public getDronesByState = async (req: Request, res: Response): Promise<void> => {
      try {
       const state: any = req.query.name;
       console.log(state)
        const drones = await this.DroneService.findDronesByState(state);
        res.json(drones);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  

  public deleteDrone = async (req: Request, res: Response): Promise<void> => {
    try {
      const droneId: string = req.params.id;
      const deleted = await this.DroneService.deleteDrone(droneId);
      if (deleted) {
        res.json({ message: 'Drone deleted successfully' });
      } else {
        res.status(404).json({ error: 'Drone not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default DroneController;