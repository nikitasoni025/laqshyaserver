import Ajv from "ajv";
import ajvFormats from "ajv-formats";


const ajv = new Ajv();
ajvFormats(ajv);

const userValidationSchema = {
    type: "object",
    properties: {
        fullname: { type: "string", },
        email: { type: "string", format: "email" },
        phonenumber: { type: "string", pattern: "^[0-9]{10}$" },
        password: { type: "string", minLength: 8, pattern: "^(?=.[a-z])(?=.[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$" }
    },
    required: ["fullname", "email", "phonenumber", "password"]
}

const validateUsers = ajv.compile(userValidationSchema);
export default validateUsers;
