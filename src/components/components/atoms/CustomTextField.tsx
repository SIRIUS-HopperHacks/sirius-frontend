import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type CustomTextFieldProps = TextFieldProps;

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  return <TextField variant="outlined" fullWidth margin="normal" {...props} />;
};

export default CustomTextField;