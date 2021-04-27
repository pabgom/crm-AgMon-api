import * as yup from 'yup';

let updateUserSchema = yup.object().shape({
    name: yup.string().max(255),
    password: yup.string().min(6).max(255),
    roleId: yup.number().integer().positive().min(1)
});

export default updateUserSchema;
