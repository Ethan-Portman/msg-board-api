import yup from 'yup';

// Data Schema for a New Message
const messageSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3)
        .max(15)
        .matches(/^[A-Za-z0-9_]+$/)
        .required(),
    msgText: yup
        .string()
        .trim()
        .min(2)
        .max(30)
        .required()
});

export default messageSchema;