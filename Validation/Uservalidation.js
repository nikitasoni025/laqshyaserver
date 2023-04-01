import Joi from 'joi';

const userValidationSchema=Joi.object({
    fullname:Joi.string().required().messages({
        'string.empty':'Full Name Is Required',
        'any.required':'Full Name Is Required'
    }),
    stream:Joi.string().required().messages({
        'string.empty':'Stream  Is Required',
        'any.required':'Stream  Is Required'
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
    password:Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')).required().messages({
        'string.pattern.base':'Password Must Contain Atleast 8 characters, one uppercase letter,one lowercase letter,and one digit',
        'string.empty':'Password is Required',
        'any.required':'Password is Required'
    }),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required().messages({
        'string.pattern.base':'Password Must Contain Atleast 8 characters, one uppercase letter,one lowercase letter,and one digit',
        'string.empty':'Password is Required',
        'any.required':'Password is Required',
        'any.only':'Confirm Password did not matched with Password'
    }),
})

export default userValidationSchema;

