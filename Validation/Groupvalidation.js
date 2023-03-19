import Joi from 'joi';

const groupValidationSchema=Joi.object({
    groupname:Joi.string().required().messages({
        'string.empty':'Group Name Is Required',
        'any.required':'Group Name Is Required'
    }),

    
})

export default groupValidationSchema;

