import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(7).max(50).required(),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().min(8).required(),
    passwordConfirmation: Joi.ref("password"),
});

export const loginSchema = Joi.object({
    identifier: Joi.alternatives().try(Joi.string().email({ tlds: false }), Joi.string().required()),
    password: Joi.string().required(),
});