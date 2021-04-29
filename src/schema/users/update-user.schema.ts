import * as yup from 'yup';

let updateUserSchema = yup.object().shape({
    name: yup.string().max(255),
    password: yup.string().min(6).max(255),
    email: yup.string().email().min(6).max(255),
    role: yup.number().integer().positive().min(1)
});

export default updateUserSchema;
