import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Chip,
} from '@mui/material';
import {
  DirectionsBoat,
  AccountCircle,
  Notifications,
  Settings,
  Dashboard,
  LocalShipping,
  Search,
  Add,
} from '@mui/icons-material';
import { useState } from 'react';
import { ApiStatus } from './ApiStatus';

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
}

export function Header({
  title = 'Ocean Freight Logistics Platform',
  showNavigation = true
}: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        {/* Logo and Title */}
        <DirectionsBoat sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Navigation Buttons */}
        {showNavigation && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Button
              color="inherit"
              startIcon={<Dashboard />}
              sx={{ mr: 1 }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              startIcon={<LocalShipping />}
              sx={{ mr: 1 }}
            >
              Shipments
            </Button>
            <Button
              color="inherit"
              startIcon={<Search />}
              sx={{ mr: 1 }}
            >
              Track
            </Button>
            <Button
              color="inherit"
              startIcon={<Add />}
              variant="outlined"
              sx={{
                mr: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              New Booking
            </Button>
          </Box>
        )}

        {/* API Status */}
        <ApiStatus />

        {/* Notifications */}
        <IconButton
          color="inherit"
          onClick={handleNotificationsOpen}
          sx={{ ml: 1 }}
        >
          <Notifications />
        </IconButton>

        {/* Profile Menu */}
        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
          sx={{ ml: 1 }}
        >
          <AccountCircle />
        </IconButton>

        {/* Profile Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <AccountCircle sx={{ mr: 1 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { width: 320, maxHeight: 400 }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Shipment OFLP-2024-001 has arrived at Shanghai Port
              </Typography>
              <Chip label="New" size="small" color="primary" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Route LAX-SHA has been updated with new schedule
              </Typography>
              <Chip label="Update" size="small" color="secondary" />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Your freight quote request is ready for review
              </Typography>
              <Chip label="Action Required" size="small" color="warning" />
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleNotificationsClose}>
            <Typography variant="body2" color="primary">
              View All Notifications
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
