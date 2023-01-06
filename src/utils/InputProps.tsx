import { FormikProps } from 'formik';

export function inputProps<T>(props: FormikProps<T>, id: keyof T) {
  return {
    error: props.touched[id] && props.errors[id],
    value: props.values[id] ?? '',
    id,
    onBlur: props.handleBlur,
    onChange: props.handleChange,
  };
}