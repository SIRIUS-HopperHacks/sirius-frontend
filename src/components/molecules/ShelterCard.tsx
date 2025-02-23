import React from "react";
import { Paper, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";

interface ShelterCardProps {
  name: string;
  distance: string;
  phone: string;
  icon: React.ReactNode;
}

const ShelterCard: React.FC<ShelterCardProps> = ({ name, distance, phone, icon }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: "16px", mb: 1, cursor: "pointer" }}>
      <ListItem component="div">
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "#980000", color: "white" }}>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <>
              Distance: {distance}
              <br />
              {phone}
            </>
          }
        />
      </ListItem>
    </Paper>
  );
};

export default ShelterCard;
