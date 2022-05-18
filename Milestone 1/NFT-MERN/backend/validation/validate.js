const Joi = require("joi");

const registrationValidation = formData => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    fullName: Joi.string().required().max(20),
  });

  return schema.validate(formData);
}

const loginValidation = formData => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });

  return schema.validate(formData);
}

module.exports = {
  registrationValidation,
  loginValidation,
}
