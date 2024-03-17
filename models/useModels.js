const Joi = require('joi');


//Request Schema for /api/calculate

const requestSchema = Joi.object({
    zone: Joi.string().valid('central', 'east', 'west', 'north','south').required(),
    organization_id: Joi.number().integer().min(1).max(10).required(),
    total_distance: Joi.number().positive().required(),
    item_type: Joi.string().valid('perishable', 'non-perishable').required()
  });




  module.exports = requestSchema;