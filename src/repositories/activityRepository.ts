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
    const activity = await Activity.create(data);
    return activity
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


  // Find the drone by ID
  public async checkMedicationIds(id: any, newItem: any): Promise<Activity | null> {
    const getMedications = await Activity.findByPk(id);
    if (getMedications) {
      // Check if the code already exists in the MedicationItems array
      const codeExists = getMedications.MedicationItems.some((item) => item.code === newItem.code);
      if (codeExists) {
        console.log("Item with the same code already exists in the MedicationItems.");
      } else {
        // Push the new item to the MedicationItems array
        getMedications.MedicationItems.push(newItem);
        // Save the updated getMedications
        await getMedications.save();
        // The MedicationItems array has been updated
        console.log("Updated MedicationItems array:", getMedications.MedicationItems);
      }
    }
    return getMedications
  }





  public async delete(id: string): Promise<boolean> {
    const deletedRows = await Activity.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default ActivityRepository;
