import Joi from 'joi';

const registerDroneSchema = Joi.object({
  serialNumber: Joi.string().max(100).required(),
  model: Joi.string().valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight').required(),
  weightLimit: Joi.number().max(500).required(),
  batteryCapacity: Joi.number().required(),
});

const loadMedicationSchema = Joi.object({
  droneId: Joi.number().required(),
  medicationItems: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      weight: Joi.number().required(),
      code: Joi.string().required(),
      image: Joi.string().required(),
    })
  ).required(),
});

export {
  registerDroneSchema,
  loadMedicationSchema,
};
