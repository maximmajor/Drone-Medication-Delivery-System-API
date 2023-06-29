import { Op } from 'sequelize';
import { Medication } from '../models/medicationModel';
import sequelize from 'sequelize/types/sequelize';


class MedicationRepository {
  public async findAll(): Promise<Medication[]> {
    return Medication.findAll();
  }

  public async findById(id: string): Promise<Medication | null> {
    return Medication.findByPk(id);
  }

  public async findByMedicationIds(medicationIds: string): Promise<Medication[] | null> {
    const getMedications = await Medication.findAll({
      where: { id: medicationIds },
    });
    return getMedications
  }



  public async findByCode(code: string): Promise<Medication[] | null> {
    const getDrone = await Medication.findAll({
      where: { code },
    });
    return getDrone
  }

  public async create(data: Medication): Promise<Medication> {
    return Medication.create(data);
  }

  public async update(id: Medication, updates: Partial<Medication>): Promise<Medication | null> {
    const [numRowsAffected, updatedMedication] = await Medication.update(updates, {
      where: { id },
      returning: true,
    });
    if (numRowsAffected === 0) {
      return null; // Drone not found
    }
    return updatedMedication[0];
  }

  public async delete(id: string): Promise<boolean> {
    const deletedRows = await Medication.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default MedicationRepository;
