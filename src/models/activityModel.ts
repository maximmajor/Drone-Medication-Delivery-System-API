import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, BeforeSave } from 'sequelize-typescript';
import { Drone } from './droneModel';
import { Medication } from './medicationModel';

interface MedicationItem {
  itemName: string;
  code: string;
  weight: number;
}
@Table
export class Activity extends Model<Activity> {
  @Column({ type: DataType.STRING, allowNull: false })
  location!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status!: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "not yet" })
  timeLeft!: string;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  WeightOfLoadAdded!: number

  @Column({ type: DataType.STRING, defaultValue: "not yet" })
  timeReached!: string;

  @Column({ type: DataType.STRING, defaultValue: "not yet" })
  timeReturned!: string;


  @Column({ type: DataType.TEXT })
  conveyComment!: string;

  @ForeignKey(() => Drone)
  @Column({ type: DataType.INTEGER })
  droneId!: number;

  @BelongsTo(() => Drone)
  drone!: Drone;

  @Column({ type: DataType.ARRAY(DataType.JSONB) })
  MedicationItems!: MedicationItem[];


  @BelongsToMany(() => Medication, 'ActivityMedications', 'activityId', 'medicationId')
  medications!: Medication[];
}
