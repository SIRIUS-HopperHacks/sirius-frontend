import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShelterCard from "@molecules/ShelterCard";
import SearchIcon from "@mui/icons-material/Search";
import Map from "@molecules/Map";
import BottomNavigationBar from "@molecules/BottomNavBar";

const SpecificShelterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(1);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    }
  };
  const shelter = location.state?.shelter;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!shelter) {
    return <Typography align="center">No Shelter Data Available</Typography>;
  }

  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="Find the location"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#f0f0f0",
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              display: "none",
            },
          },
        }}
      />

      <ShelterCard
        name={shelter.name}
        distance={shelter.distance}
        phone={shelter.phone}
        icon={shelter.icon}
      />

      <Paper elevation={3} sx={{ borderRadius: "16px", p: 3, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <PhoneIcon color="error" />
          <Typography variant="body2">{shelter.phone}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <LocationOnIcon color="error" />
          <Typography variant="body2">
            29-59 Northern Blvd, Long Island City, NY 11101
          </Typography>
        </Box>
      </Paper>

      <Map />
      <BottomNavigationBar value={value} onChange={handleChange} />
    </Container>
  );
};

export default SpecificShelterPage;
