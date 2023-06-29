import Joi from 'joi';

const registerDroneSchema = Joi.object({
  serialNumber: Joi.string().max(100).required(),
  model: Joi.string().valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight').required(),
  weightLimit: Joi.number().max(500).required(),
  batteryCapacity: Joi.number().max(100).required(),
  state: Joi.string().valid('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING').required(),
});


const medicationSchema = Joi.object({
  name: Joi.string().regex(/^[A-Za-z0-9-_]+$/).required(),
  weight: Joi.number().required(),
  code: Joi.string().regex(/^[A-Z0-9_]+$/).required(),
  image: Joi.string().required(),
});


export {
  registerDroneSchema,
  medicationSchema,
};
