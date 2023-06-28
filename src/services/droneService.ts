import  {Drone}  from '../models/droneModel';
import  DroneRepository  from '../repositories/droneRepository';

 class DroneService {
  private droneRepository: DroneRepository;

  constructor() {
    this.droneRepository = new DroneRepository();
  }

  public async createDrone(data: any): Promise<Drone> {
    console.log(" secomd", data);
  const drone = await  this.droneRepository.create(data);
  return drone
  }

  public async getDroneById(id: string): Promise<Drone | null> {
    return this.droneRepository.findById(id);
  }

  public async getAllDrones(): Promise<Drone[]> {
    console.log("me")
    return this.droneRepository.findAll();
  }

  public async updateDrone(id: any, data: Drone): Promise<Drone | null> {
    return this.droneRepository.updateDrone(id, data);
  }

  public async findDronesByState(state: string): Promise<Drone[]> {
    console.log("me")
    return this.droneRepository.findDronesByState(state);
  }


  public async deleteDrone(id: string): Promise<boolean> {
    return this.droneRepository.delete(id);
  }
}
export default DroneService;