import { Activity } from './../models/activityModel';

class ActivityRepository {
  public async findAll(): Promise<Activity[]> {
    return Activity.findAll();
  }

  public async findById(id: string): Promise<Activity | null> {
    return Activity.findByPk(id);
  }

  public async findByIdAndStatus(droneId: string, status: string): Promise<Activity | null> {
    return Activity.findOne({ where: { droneId, status } });
  }

  public async create(data: any): Promise<Activity> {
    console.log("ours")
    const activity = await Activity.create(data);
    return  activity
  }

  public async update(id: Activity, updates: Partial<Activity>): Promise<Activity | null> {

    console.log("repos", updates, id);
    const [numRowsAffected, updatedActivity] = await Activity.update(updates, {
      where: { id },
      returning: true,
    });
  
    if (numRowsAffected === 0) {
      return null; // Drone not found
    }
  
    return updatedActivity[0];
  }

  public async delete(id: string): Promise<boolean> {
    const deletedRows = await Activity.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default ActivityRepository;
