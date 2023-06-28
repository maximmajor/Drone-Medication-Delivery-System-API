import  {Medication}  from '../models/medicationModel';

class MedicationRepository {
  public async findAll(): Promise<Medication[]> {
    return Medication.findAll();
  }

  public async findById(id: string): Promise<Medication | null> {
    return Medication.findByPk(id);
  }

  public async create(data: Medication): Promise<Medication> {
    return Medication.create(data);
  }

  public async update(medication: Medication, updates: Partial<Medication>): Promise<Medication> {
    return medication.update(updates);
  }

  public async delete(id: string): Promise<boolean> {
    const deletedRows = await Medication.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

export default MedicationRepository;
