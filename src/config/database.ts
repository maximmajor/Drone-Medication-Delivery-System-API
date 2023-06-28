import { Sequelize } from 'sequelize-typescript';
import { Drone } from '../models/droneModel';
import { Medication } from '../models/MedicationModel';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME! ,  process.env.DB_PASSWORD, {
  dialect: 'postgres',
  port: 5432,
  host: 'localhost',
});



sequelize.addModels([Drone, Medication]);

export default sequelize;
