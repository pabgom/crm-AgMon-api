import * as yup from 'yup';
import { Roles } from '../../config';

let createUserSchema = yup.object().shape({
    name: yup.string().required().max(255),
    password: yup.string().required().min(6).max(255),
    roleId: yup
        .number()
        .integer()
        .positive()
        .min(1)
        .default(+Roles.Basic)
});

export default createUserSchema;
