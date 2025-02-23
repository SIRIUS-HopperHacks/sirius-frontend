import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...rest }) => {
  return (
    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} {...rest}>
      {children}
    </Button>
  );
};

export default PrimaryButton;