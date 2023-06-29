import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Drone extends Model<Drone> {
  @Column({ type: DataType.STRING, allowNull: false })
  serialNumber!: string;

  @Column({ type: DataType.STRING })
  model!: string;

  @Column({ type: DataType.FLOAT })
  weightLimit!: number;

  @Column({ type: DataType.FLOAT })
  batteryCapacity!: number;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  WeightOfLoadAdded!: number;

  @Column({ type: DataType.ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') })
  state!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  conveyCount!: number;
}
