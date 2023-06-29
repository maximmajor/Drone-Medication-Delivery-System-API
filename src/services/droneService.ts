import { Drone } from '../models/droneModel';
import DroneRepository from '../repositories/droneRepository';
import ActivityRepository from '../repositories/activityRepository';
import { HttpException } from '../middlewares/HttpException';
import { Activity } from '../models/activityModel';

class DroneService {
  private droneRepository: DroneRepository;
  private ActivityRepository: ActivityRepository;

  constructor() {
    this.droneRepository = new DroneRepository();
    this.ActivityRepository = new ActivityRepository();
  }

  public async createDrone(data: Drone): Promise<Drone | null> {
    const { serialNumber } = data
    const getDrone = await this.droneRepository.findBySerialNumber(serialNumber)
    if (getDrone!.length > 0) {
      throw new HttpException(409, 'Serial Number already exist');
    }
    const drone = await this.droneRepository.create(data);
    return drone
  }


  public async getDroneById(id: string): Promise<Drone | null> {
    const getDrone = this.droneRepository.findById(id);
    return getDrone
  }

  public async getAllDrones(): Promise<Drone[]> {
    const getAllDrones = this.droneRepository.findAll();
    return getAllDrones
  }

  public async updateDrone(id: any, data: Drone): Promise<Drone | Activity | null> {
    if (data.state) {
      if (data.state === 'RETURNING') {
        await this.ActivityRepository.findByIdAndStatus(id, data.state)
        await this.ActivityRepository.update(id, { status: "Closed" })
        const updateDrone = this.droneRepository.updateDrone(id, data);
        return updateDrone
      }
      const updateDrone = this.droneRepository.updateDrone(id, data);
      return updateDrone
    }
    const updateDrone = this.droneRepository.updateDrone(id, data);
    return updateDrone
  }

  public async findDronesByState(state: string): Promise<Drone[]> {
    const getDrones = this.droneRepository.findDronesByState(state);
    return getDrones
  }

  public async findDronesByBatteryLevel(level: string): Promise<Drone | {} | null> {
    const getAllDrones = this.droneRepository.findAll();
    if (level === "below") {
      const getBatteriesBelow25 = (await getAllDrones).filter(ele => ele.batteryCapacity < 25)
      return getBatteriesBelow25
    }
    const getBatteriesAbove25 = (await getAllDrones).filter(ele => ele.batteryCapacity > 25)
    return getBatteriesAbove25
  }


  public async deleteDrone(id: string): Promise<boolean> {
    const deleteDrone = this.droneRepository.delete(id);
    return deleteDrone
  }
}
export default DroneService;