import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomTextField from '@atoms/CustomTextField';
import PrimaryButton from '@atoms/PrimaryButton';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      <CustomTextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <CustomTextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <PrimaryButton type="submit">
        Login
      </PrimaryButton>
    </Box>
  );
};

export default LoginForm;