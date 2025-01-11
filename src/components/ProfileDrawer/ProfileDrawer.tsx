import React from "react";
import { Drawer, Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import "./ProfileDrawer.scss";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    email: string;
    name: string;
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  profileData,
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear authentication state
    onClose(); // Close the drawer
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box className="profile-drawer">
        {/* Profile Info Section */}
        <div className="profile-details">
          <Typography variant="h6" className="profile-title">
            Profile Information
          </Typography>
          <Typography variant="body1" className="profile-info">
            <strong>Name:</strong> {profileData.name}
          </Typography>
          <Typography variant="body1" className="profile-info">
            <strong>Email:</strong> {profileData.email}
          </Typography>
        </div>

        {/* Logout Button */}
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;
