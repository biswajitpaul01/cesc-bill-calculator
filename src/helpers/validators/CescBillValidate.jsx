export const initialValues = {
  unit: "",
};

export const cescBillValidate = (values) => {
  const errors = {};

  if (values.unit < 1) {
    errors.unit = "Unit must be greater than 0";
  }

  return errors;
};
