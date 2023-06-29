import { Medication } from '../models/medicationModel';
import MedicationRepository from '../repositories/medicationRepository';
import ActivityRepository from '../repositories/activityRepository';
import droneRepository from '../repositories/droneRepository';
import { Activity } from '../models/activityModel';
import { HttpException } from '../middlewares/HttpException';


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
    const getmedicationsByIds: any = await this.medicationRepository.findByMedicationIds(data.medicationIds);
    let totalWeight: any = 0;
    getmedicationsByIds.forEach((medication: { weight: number; }) => {
      totalWeight += medication.weight;
    });
    const getMedicationItems: any = getmedicationsByIds.map((ele: { name: any; code: any; weight: any; }) => {
      const items = { itemName: ele.name, code: ele.code, weight: ele.weight }
      return items
    })
    const findActivityByStatus = await this.ActivityRepository.findByIdAndStatus(droneId, "Open")
    if (findActivityByStatus) {
      const getDroneById: any = await this.droneRepository.findById(droneId)
      if (!getDroneById) {
        throw new HttpException(409, 'drone is not found');
      }
      if (totalWeight > getDroneById.weightLimit || getDroneById.WeightOfLoadAdded + totalWeight > getDroneById.weightLimit) {
        const loadItCanCarry = getDroneById.weightLimit - getDroneById.WeightOfLoadAdded
        throw new HttpException(409, `you have excided drone weight limit, drone can accept just ${loadItCanCarry}`);
      }
      await this.ActivityRepository.checkMedicationIds(findActivityByStatus.id, getMedicationItems)
      await this.ActivityRepository.update(findActivityByStatus.id, { location, status, timeLeft, timeReached, timeReturned, WeightOfLoadAdded, conveyComment });
      await this.droneRepository.updateDrone(droneId, { WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight, state: 'LOADING' })
      await this.ActivityRepository.update(findActivityByStatus.id, { WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight });
      return findActivityByStatus!;

    }
    const getDroneById: any = await this.droneRepository.findById(droneId)
    if (!getDroneById) {
      throw new HttpException(409, 'drone is not found');
    }
    if (getDroneById.batteryCapacity < 25) {
      throw new HttpException(409, "drone Battery is low, you cant load it at the moment");
    }
    if (totalWeight > getDroneById.weightLimit || getDroneById.WeightOfLoadAdded + totalWeight > getDroneById.weightLimit) {
      const loadItCanCarry = getDroneById.weightLimit - getDroneById.WeightOfLoadAdded
      throw new HttpException(409, `you have excided drone weight limit, drone can accept just ${loadItCanCarry}`);
    }
    const newActivity: Activity = await this.ActivityRepository.create({ location, status, timeLeft, timeReached, timeReturned, WeightOfLoadAdded, conveyComment, medicationIds, droneId, MedicationItems: getMedicationItems });
    await this.droneRepository.updateDrone(droneId, { WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight, state: 'LOADING' })
    await this.ActivityRepository.update(newActivity.id, { WeightOfLoadAdded: getDroneById.WeightOfLoadAdded + totalWeight });
    return newActivity!;
  }

  public async getAllActivity(): Promise<Activity[]> {
    const getAllActivity: any = this.ActivityRepository.findAll();
    console.log(await getAllActivity)
    return getAllActivity
  }

}
export default ActivityService
