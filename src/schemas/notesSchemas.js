import Joi from "joi";

export const noteSchema = Joi.object({
    note_name: Joi.string().min(3).max(255).required(),
    note_content: Joi.string().min(1).required(),
    note_content_type: Joi.string().valid("Plaintext", "Markdown").required(),
    note_archived: Joi.boolean().required(),
    note_color: Joi.string().regex(/^#[0-9A-F]{6}$/i).required(),
})

export const categorySchema = Joi.object({
    cat_name: Joi.string().min(3).max(50).required(),
    cat_color: Joi.string().regex(/^#[0-9A-F]{6}$/i).required(),
})