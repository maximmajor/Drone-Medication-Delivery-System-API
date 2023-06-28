import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Medication extends Model<Medication> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.FLOAT })
  weight!: number;

  @Column({ type: DataType.STRING })
  code!: string;

  @Column({ type: DataType.STRING })
  image!: string;
}
