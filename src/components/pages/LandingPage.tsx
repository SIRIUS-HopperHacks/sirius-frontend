import React from "react";
import { Container, Box, Typography, Link } from "@mui/material";
import PrimaryButton from "@atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo/SIRIUS_LOGO.png";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "http://localhost:8000/";
  };

  const handleUser = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/homepage");
  };
  return (
    <Container>
      <Box
        sx={{
          mt: 8,
          mb: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <img
            src={logo}
            alt="Sirius Logo"
            style={{ width: "10rem", height: "auto", marginTop: "2rem" }}
          />
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <PrimaryButton
            type="submit"
            sx={{
              backgroundColor: "#980000",
              "&:hover": { backgroundColor: "#7a0000" },
              width: "30%",
            }}
            onClick={handleUser}
          >
            Continue as User
          </PrimaryButton>
          <Typography>
            <Link color="#980000" underline="hover" onClick={handleAdmin}>
              Continue as Admin
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
