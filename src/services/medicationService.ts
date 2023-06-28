import  {Medication}  from '../models/medicationModel';
import  MedicationRepository  from '../repositories/medicationRepository';

class MedicationService {
  private medicationRepository: MedicationRepository;

  constructor() {
    this.medicationRepository = new MedicationRepository();
  }

  public async createMedication(data: Medication): Promise<Medication> {
    return this.medicationRepository.create(data);
  }

  public async getMedicationById(id: string): Promise<Medication | null> {
    return this.medicationRepository.findById(id);
  }

  public async getAllMedications(): Promise<Medication[]> {
    return this.medicationRepository.findAll();
  }

  public async updateMedication(id: Medication, data: Medication): Promise<Medication | null> {
    return this.medicationRepository.update(id, data);
  }

  public async deleteMedication(id: string): Promise<boolean> {
    return this.medicationRepository.delete(id);
  }
}
export default MedicationService
