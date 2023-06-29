import { Request, Response } from 'express';
import { Drone } from '../models/droneModel';
import droneService from '../services/droneService'
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
      const createDrone = await this.DroneService.createDrone(value)
      res.status(200).json(createDrone);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }


  public getDroneById = async (req: Request, res: Response): Promise<void> => {
    try {
      const droneId: string = req.params.id;
      const drone = await this.DroneService.getDroneById(droneId);
      if (drone) {
        res.status(200).json(drone);
      } else {
        res.status(404).json({ error: 'Drone does not exist in the database' });
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


  public getAllDrones = async (req: Request, res: Response): Promise<void> => {
    try {
      const drones = await this.DroneService.getAllDrones();
      res.status(200).json({ drones });
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
    }
  }


  public updateDrone = async (req: Request, res: Response): Promise<void> => {
    try {
      const droneId: any = req.params.id;
      const droneData: Drone = req.body;
      const updatedDrone = await this.DroneService.updateDrone(droneId, droneData);
      if (updatedDrone) {
        res.status(200).json(updatedDrone);
      } else {
        res.status(404).json({ error: 'Drone to be Updated not found' });
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


  public getDronesByState = async (req: Request, res: Response): Promise<void> => {
    try {
      const state: any = req.query.name;
      const drones = await this.DroneService.findDronesByState(state);
      if (drones.length !== 0) {
        res.status(200).json(drones);
      } else {
        res.status(201).json({ message: `No Available Drones in ${state} state` });
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


  public getDronesByBatteryLevel = async (req: Request, res: Response): Promise<void> => {
    try {
      const level: any = req.query.word;
      const drones = await this.DroneService.findDronesByBatteryLevel(level);
      res.status(200).json(drones);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        const { statusCode, message } = error;
        res.status(statusCode).json({ message });
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
      }
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

export default DroneController;