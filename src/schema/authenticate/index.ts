import * as yup from 'yup';

let authSchema = yup.object().shape({
    email: yup.string().email().required().max(255),
    password: yup.string().required().max(255)
});

export default authSchema;
