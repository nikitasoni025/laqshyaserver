import Joi from 'joi';

const individualValidationSchema=Joi.object({
    fullname:Joi.string().required().messages({
        'string.empty':'Full Name Is Required',
        'any.required':'Full Name Is Required'
    }),
    email:Joi.string().email().required().messages({
        'string.email':'Invalid email Address',
        'string.empty':'Email Is Required',
        'any.required':'Email Is Required'
    }),
    phonenumber:Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
        'string.pattern.base':'Phone Number Must be 10 Digits',
        'string.empty':'Phone Number Is Required',
        'any.required':'Phone Number Is Required'
    }),
    institution:Joi.string().required().messages({
        'string.empty':'Institution  Is Required',
        'any.required':'Institution  Is Required'
    }),
    standard:Joi.string().required().messages({
        'string.empty':'Standard  Is Required',
        'any.required':'Standard  Is Required'
    }),
    eventname:Joi.string().required().messages({
        'string.empty':'Eventname Is Empty Contact To Developer',
        'any.required':'Eventname Is Empty Contact To Developer'
    }),
    registrationfee:Joi.number().required().messages({
        'string.empty':'Eventname Is Empty Contact To Developer',
        'any.required':'Eventname Is Empty Contact To Developer'
    }),
    
})

export default individualValidationSchema;

