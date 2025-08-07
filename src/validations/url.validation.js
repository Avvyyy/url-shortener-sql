import Joi from "joi";

export const urlMapSchema = Joi.object({
    baseUrl: Joi.string().alphanum().required,
})