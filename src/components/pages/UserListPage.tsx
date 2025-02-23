import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "@molecules/BottomNavBar";
import {
  Container,
  Typography,
  List,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  ListItemText,
  Badge
} from "@mui/material";

const mockUsers = [
  {
    id: 1,
    name: "User1",
    avatar: "https://via.placeholder.com/50",
    ip: "72.14.201.227",
    time: "9:20 AM",
    unread: 1,
  },
  {
    id: 2,
    name: "User2",
    avatar: "https://via.placeholder.com/50",
    ip: "52.24.201.527",
    time: "9:20 AM",
    unread: 1,
  },
];

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [value, setValue] = useState(2);
  const [open, setOpen] = useState(false);

  const handleSelectUser = (id: number) => {
    setSelectedUser(id);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleClick = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    } else if (newValue === 2) {
      navigate("/user-list");
    } else if (newValue === 4) {
      navigate("/");
    }
  };

  return (
    <Container>
      {/* Header */}
      <Typography variant="h5" color="#980000" fontWeight="bold" mt={2} mb={2}>
        Inbox
      </Typography>
      {/* Tabs */}
      <Typography
        variant="subtitle1"
        color="#980000"
        fontWeight="bold"
        sx={{
          borderBottom: "2px solid #980000",
          display: "inline-block",
          mb: 2,
        }}
      >
        Users
      </Typography>
      {/* User List */}
      <List>
        {users.map((user) => (
          <Box key={user.id} sx={{ position: "relative" }}>
            <ListItem
              onClick={() => handleSelectUser(user.id)}
              sx={{
                border: selectedUser === user.id ? "2px solid #980000" : "2px solid transparent",
                borderRadius: "16px",
                mb: 1,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#f8f8f8", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" },
              }}
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography fontWeight="bold">{user.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="caption">IP: {user.ip}</Typography>
                  </>
                }
              />
              <Typography variant="caption" sx={{ mr: 2 }}>
                {user.time}
              </Typography>
              <Badge
                badgeContent={user.unread}
                color="error"
                sx={{ marginRight: "10px" }}
              />
            </ListItem>

            {/* Swipe Delete Button */}
            {selectedUser === user.id && (
              <IconButton
                onClick={() => handleDeleteUser(user.id)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#E0E0E0",
                  borderRadius: "12px",
                  padding: "10px",
                }}
              >
                
              </IconButton>
            )}
          </Box>
        ))}
      </List>
      <BottomNavigationBar value={value} onClick={handleClick} />
    </Container>
  );
};

export default UserListPage;
