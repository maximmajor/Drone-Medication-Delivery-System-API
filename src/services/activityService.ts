import  {Medication}  from '../models/medicationModel';
import  MedicationRepository  from '../repositories/medicationRepository';
import ActivityRepository from '../repositories/activityRepository';
import droneRepository from '../repositories/droneRepository';
import { Activity } from '../models/activityModel';
 

class ActivityService {
  private medicationRepository: MedicationRepository;
  private ActivityRepository: ActivityRepository;
  private droneRepository: droneRepository;

  constructor() {
    this.medicationRepository = new MedicationRepository();
    this.ActivityRepository = new ActivityRepository();
    this.droneRepository = new droneRepository();
  }

  public async loadDrone(droneId: any, data: any): Promise<Activity | null | string> {
    const { location, status, timeLeft, timeReached, timeReturned, WeightOfLoadAdded, conveyComment, medicationIds } = data;
    const getmedicationsByIds: any = await this.medicationRepository.findByMedicationIds( data.medicationIds);

    let totalWeight: any = 0;
    getmedicationsByIds.forEach((medication: { weight: number; }) => {
      totalWeight += medication.weight;
    });

const findActivityByStatus = await this.ActivityRepository.findByIdAndStatus(droneId, "LOADING")
if(findActivityByStatus){
  const getDroneById:any = await this.droneRepository.findById(droneId)
    if(!getDroneById){
      return "drone is not found"
    }
    if( totalWeight > getDroneById.weightLimit  || getDroneById.WeightOfLoadAdded + totalWeight > getDroneById.weightLimit){
      const loadItCanCarry = getDroneById.weightLimit - getDroneById.WeightOfLoadAdded
      return `you have excided drone weight limit, drone can accept just ${loadItCanCarry}`
    }
    await this.ActivityRepository.update(findActivityByStatus.id, {location, status, timeLeft, timeReached, timeReturned, WeightOfLoadAdded, conveyComment});

    
     await this.droneRepository.updateDrone(droneId, {WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight, state: 'LOADING'})
  
     await this.ActivityRepository.update(findActivityByStatus.id, {WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight});
    return findActivityByStatus!;

}


    const getDroneById:any = await this.droneRepository.findById(droneId)
    if(!getDroneById){
      return "drone is not found"
    }

    if (getDroneById.batteryCapacity < 25){
      return "drone Battery is low, you cant load it at the moment"
    }
    if( totalWeight > getDroneById.weightLimit  || getDroneById.WeightOfLoadAdded + totalWeight > getDroneById.weightLimit){
      const loadItCanCarry = getDroneById.weightLimit - getDroneById.WeightOfLoadAdded
      return `you have excided drone weight limit, drone can accept just ${loadItCanCarry}`
    }
    const newActivity: Activity = await this.ActivityRepository.create({location, status, timeLeft, timeReached, timeReturned, WeightOfLoadAdded, conveyComment, medicationIds , droneId});

    
     await this.droneRepository.updateDrone(droneId, {WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight, state: 'LOADING'})
  
     await this.ActivityRepository.update(newActivity.id, {WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight});
    return newActivity!;

  }

  public async getAllActivity(): Promise<Activity []> {
    return this.ActivityRepository.findAll();
  }

  // public async updateMedication(id: Medication, data: Medication): Promise<Medication | null> {
  //   return this.medicationRepository.update(id, data);
  // }

  // public async deleteMedication(id: string): Promise<boolean> {
  //   return this.medicationRepository.delete(id);
  // }
}
export default ActivityService
