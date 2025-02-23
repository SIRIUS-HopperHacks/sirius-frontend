import React from "react";
import { Tabs, Tab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface BottomNavigationBarProps {
  value: number;
  onClick: (newValue: number) => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  value,
  onClick,
}) => {
  return (
    <Tabs
      value={value}
      aria-label="bottom navigation tabs"
      centered
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        boxShadow: 3,
        "& .MuiTabs-indicator": {
          backgroundColor: "#d32f2f",
          height: "4px",
        },
      }}
    >
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<HomeIcon />}
        onClick={() => onClick(0)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<SearchIcon />}
        onClick={() => onClick(1)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<ModeCommentIcon />}
        onClick={() => onClick(2)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<AccountCircleIcon />}
        onClick={() => onClick(3)}
      />
    </Tabs>
  );
};

export default BottomNavigationBar;
