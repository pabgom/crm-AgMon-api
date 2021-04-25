import * as yup from 'yup';

let createCustomerSchema = yup.object().shape({
    name: yup.string().required().max(255),
    surname: yup.string().required().max(255)
});

export default createCustomerSchema;
