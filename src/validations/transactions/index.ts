import * as yup from "yup";

const createTransactionValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        username: yup.string().required("username is required"),
        value: yup.number().required("value is required"),
      }),
    },
  },
};

export default createTransactionValidator;
