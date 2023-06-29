import { Medication } from '../models/medicationModel';
import MedicationRepository from '../repositories/medicationRepository';
import { HttpException } from '../middlewares/HttpException';

class MedicationService {
  private medicationRepository: MedicationRepository;

  constructor() {
    this.medicationRepository = new MedicationRepository();
  }

  public async createMedication(data: Medication): Promise<Medication | string> {
    const { code } = data
    const getMedication = await this.medicationRepository.findByCode(code);
    if (getMedication!.length > 0) {
      return 'code already exist';
    }
    const createMedical = await this.medicationRepository.create(data);
    return createMedical
  }

  public async getMedicationById(id: string): Promise<Medication | null> {
    const getMedication = this.medicationRepository.findById(id);
    return getMedication
  }

  public async getAllMedications(): Promise<Medication[]> {
    const getAllMedication = this.medicationRepository.findAll();
    return getAllMedication
  }

  public async updateMedication(id: Medication, data: Medication): Promise<Medication | null> {
    const updateMedication = this.medicationRepository.update(id, data);
    return updateMedication
  }

  public async deleteMedication(id: string): Promise<boolean> {
    const deleteMedication = this.medicationRepository.delete(id);
    return deleteMedication
  }
}
export default MedicationService
