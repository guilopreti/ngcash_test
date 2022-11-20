import * as yup from "yup";

export const createUserValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        username: yup
          .string()
          .required("username is required")
          .min(3, "minimum 3 characters"),
        password: yup
          .string()
          .required("password is required")
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z$*&@#]{8,}$/,
            "password must have at least 8 characters, 1 uppercase letter and 1 number"
          ),
      }),
    },
  },
};

export const loginUserValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        username: yup.string().required("username is required"),
        password: yup.string().required("password is required"),
      }),
    },
  },
};
