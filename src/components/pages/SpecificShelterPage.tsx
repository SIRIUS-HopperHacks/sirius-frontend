import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  ListItemText,
} from "@mui/material";
import {
  Phone,
  LocationOn,
  LocalHospital,
  FireTruck,
  LocalPolice,
  Search,
} from "@mui/icons-material";
import Map from "@molecules/Map";
import BottomNavigationBar from "@molecules/BottomNavBar";

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "hospital":
      return <LocalHospital />;
    case "fire":
      return <FireTruck />;
    case "police":
      return <LocalPolice />;
    default:
      return <LocationOn />;
  }
};

const SpecificShelterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(1);

  const handleClick = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    } else if (newValue === 2) {
      navigate("/user-list");
    }
    else if (newValue === 4) {
      navigate("/");
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
              <Search />
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

      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          p: 2.5,
          mb: 8,
          mt: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display={"flex"}>
          <Avatar sx={{ backgroundColor: "#980000", color: "white", mr: 3 }}>
            {getIcon(shelter.iconType)}
          </Avatar>
          <Box display={"flex"} flexDirection={"column"}>
            <ListItemText
              primary={shelter.name}
              secondary={
                <>
                  Distance: {shelter.distance}
                  <br />
                  {shelter.phone}
                </>
              }
            />
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Phone color="error" />
                <Typography variant="body2">{shelter.phone}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                  mb: 2,
                }}
              >
                <LocationOn color="error" />
                <Typography variant="body2">{shelter.location}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Map center={{ lat: shelter.lat, lng: shelter.lng }} />
      </Paper>
      <BottomNavigationBar value={value} onClick={handleClick} />
    </Container>
  );
};

export default SpecificShelterPage;
