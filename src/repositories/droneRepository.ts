import { Op } from 'sequelize';
import { Drone } from '../models/droneModel';

class droneRepository {
  public Drone = Drone;

  public async findAll(): Promise<Drone[]> {
    return await this.Drone.findAll();
  }

  public async findById(id: string): Promise<Drone | null> {
    return await this.Drone.findByPk(id);
  }

  public async create(data: Drone): Promise<Drone> {
    const createDrone = await this.Drone.create(data);
    return createDrone
  }


  public async findByModelTypeOrSerialNumber(model: string, serialNumber: string): Promise<Drone | null> {
    const getDrone = await this.Drone.findOne({
      where: {
        [Op.or]: [
          { model },
          { serialNumber },
        ],
      },
    });
    return getDrone
  }

  public async findBySerialNumber(serialNumber: string): Promise<Drone[] | null> {
    const getDrone = await this.Drone.findAll({
      where: { serialNumber },
    });
    return getDrone
  }

  public async updateDrone(id: string, updates: Partial<Drone>): Promise<Drone | null> {
    const [numRowsAffected, updatedDrones] = await Drone.update(updates, {
      where: { id },
      returning: true,
    });

    if (numRowsAffected === 0) {
      return null; // Drone not found
    }

    return updatedDrones[0];
  }

  public async delete(id: string): Promise<boolean> {
    const deletedRows = await this.Drone.destroy({ where: { id } });
    return deletedRows > 0;
  }


  public async findDronesByState(state: string): Promise<Drone[]> {
    const findByState = await Drone.findAll({ where: { state: state } });
    return findByState
  }
}

export default droneRepository;
