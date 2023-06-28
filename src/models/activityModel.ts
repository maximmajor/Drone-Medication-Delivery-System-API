import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Drone } from './droneModel';
import { Medication } from './medicationModel';

@Table
export class Activity extends Model<Activity> {
  @Column({ type: DataType.STRING, allowNull: false })
  location!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  timeLeft!: string;

  @Column({ type: DataType.STRING })
  timeReached!: string;

  @Column({ type: DataType.STRING })
  timeReturned!: string;

  @Column({ type: DataType.TEXT })
  conveyComment!: string;

  @ForeignKey(() => Drone)
  @Column({ type: DataType.INTEGER })
  droneId!: number;

  @BelongsTo(() => Drone)
  drone!: Drone;

  @BelongsToMany(() => Medication, 'ActivityMedications', 'activityId', 'medicationId')
  medications!: Medication[];
}
