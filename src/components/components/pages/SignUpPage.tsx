import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import SignUpForm from '@molecules/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <SignUpForm />
      </Box>
    </Container>
  );
};

export default SignUpPage;