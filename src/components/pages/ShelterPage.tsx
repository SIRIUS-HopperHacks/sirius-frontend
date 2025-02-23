import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "@molecules/BottomNavBar";
import {
  Container,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FireTruckIcon from "@mui/icons-material/LocalFireDepartment";
import PoliceIcon from "@mui/icons-material/LocalPolice";
import ShelterCard from "@molecules/ShelterCard";

const shelters = [
  {
    name: "Mather Hospital",
    distance: "0.5 miles",
    phone: "+1-202-555-0114",
    icon: <LocalHospitalIcon />,
  },
  {
    name: "Port Jefferson Fire Department",
    distance: "0.7 miles",
    phone: "+1-202-555-0114",
    icon: <FireTruckIcon />,
  },
  {
    name: "A Police Department",
    distance: "1.2 miles",
    phone: "+1-202-555-0114",
    icon: <PoliceIcon />,
  },
  {
    name: "B Police Department",
    distance: "1.5 miles",
    phone: "+1-202-555-0114",
    icon: <PoliceIcon />,
  },
  {
    name: "C Police Department",
    distance: "1.7 miles",
    phone: "+1-202-555-0114",
    icon: <PoliceIcon />,
  },
];
const ShelterPage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    }
  };
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
      <List>
        {filteredShelters.length > 0 ? (
          filteredShelters.map((shelter, index) => (
            <ShelterCard
              key={index}
              name={shelter.name}
              distance={shelter.distance}
              phone={shelter.phone}
              icon={shelter.icon}
            />
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No results found" />
          </ListItem>
        )}
      </List>
      <BottomNavigationBar value={value} onChange={handleChange} />
    </Container>
  );
};

export default ShelterPage;
