import React from "react";
import { Container, Box, Typography, Link } from "@mui/material";
import PrimaryButton from "@atoms/PrimaryButton";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/admin");
  };

  const handleUser = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/homepage");
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <PeopleOutlineIcon fontSize="large" />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          color="#980000"
        >
          SIRIUS
        </Typography>
        <Typography
          variant="subtitle1"
          component="h1"
          align="center"
          gutterBottom
        >
          Stay Safe, Anytime, Anywhere
        </Typography>
        <PrimaryButton
          type="submit"
          sx={{
            backgroundColor: "#980000",
            "&:hover": { backgroundColor: "#7a0000" },
          }}
          onClick={handleUser}
        >
          Continue as User
        </PrimaryButton>
        <Typography align="right">
          <Link color="#980000" underline="hover" onClick={handleAdmin}>
            Continue as Admin
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
