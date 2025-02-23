import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomTextField from '@atoms/CustomTextField';
import PrimaryButton from '@atoms/PrimaryButton';

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // handle sign up logic here
    console.log('Sign Up attempt:', { username, email, password });
  };

  return (
    <Box component="form" onSubmit={handleSignUp}>
      <CustomTextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
        Sign Up
      </PrimaryButton>
    </Box>
  );
};

export default SignUpForm;