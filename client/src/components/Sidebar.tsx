import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Dashboard,
  LocalShipping,
  Search,
  Assessment,
  Settings,
  Help,
  DirectionsBoat,
  Anchor,
  Route,
  LocationOn,
  Business,
  Receipt,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
} from '@mui/icons-material';
import { useState } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: Array<{ label: string; path: string }>;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
  width?: number;
}

export function Sidebar({
  open,
  onClose,
  variant = 'persistent',
  width = 280
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandClick = (item: string) => {
    setExpandedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/',
    },
    {
      id: 'shipments',
      label: 'Shipments',
      icon: <LocalShipping />,
      path: '/shipments',
      children: [
        { label: 'All Shipments', path: '/shipments' },
        { label: 'In Transit', path: '/shipments/in-transit' },
        { label: 'Delivered', path: '/shipments/delivered' },
        { label: 'Pending', path: '/shipments/pending' },
      ],
    },
    {
      id: 'tracking',
      label: 'Tracking',
      icon: <Search />,
      path: '/tracking',
    },
    {
      id: 'routes',
      label: 'Routes',
      icon: <Route />,
      path: '/routes',
      children: [
        { label: 'Active Routes', path: '/routes/active' },
        { label: 'Route Planning', path: '/routes/planning' },
        { label: 'Schedule', path: '/routes/schedule' },
      ],
    },
    {
      id: 'ports',
      label: 'Ports',
      icon: <Anchor />,
      path: '/ports',
      children: [
        { label: 'Port Directory', path: '/ports' },
        { label: 'Port Status', path: '/ports/status' },
        { label: 'Facilities', path: '/ports/facilities' },
      ],
    },
    {
      id: 'vessels',
      label: 'Vessels',
      icon: <DirectionsBoat />,
      path: '/vessels',
      children: [
        { label: 'Fleet Overview', path: '/vessels' },
        { label: 'Vessel Tracking', path: '/vessels/tracking' },
        { label: 'Maintenance', path: '/vessels/maintenance' },
      ],
    },
  ];

  const managementItems = [
    {
      id: 'companies',
      label: 'Companies',
      icon: <Business />,
      path: '/companies',
    },
    {
      id: 'locations',
      label: 'Locations',
      icon: <LocationOn />,
      path: '/locations',
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: <Receipt />,
      path: '/invoices',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <Assessment />,
      path: '/reports',
    },
  ];

  const settingsItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings />,
      path: '/settings',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <Help />,
      path: '/help',
    },
  ];

  const renderNavigationItem = (item: NavigationItem, level = 0) => (
    <Box key={item.id}>
      <ListItem disablePadding sx={{ pl: level * 2 }}>
        <ListItemButton
          onClick={() => {
            if (item.children) {
              handleExpandClick(item.id);
            }
            // Handle navigation here
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {item.children && (
            expandedItems.includes(item.id) ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItemButton>
      </ListItem>
      {item.children && (
        <Collapse in={expandedItems.includes(item.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child: { label: string; path: string }, index: number) => (
              <ListItem key={index} disablePadding sx={{ pl: 4 }}>
                <ListItemButton>
                  <ListItemText primary={child.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );

  const drawerContent = (
    <Box sx={{ width, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DirectionsBoat sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" color="primary">
            OFLP
          </Typography>
        </Box>
        {variant !== 'permanent' && (
          <IconButton onClick={onClose} size="small">
            <ChevronLeft />
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List>
          {navigationItems.map(item => renderNavigationItem(item))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="overline"
          sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}
        >
          Management
        </Typography>
        <List>
          {managementItems.map(item => renderNavigationItem(item))}
        </List>

        <Divider sx={{ my: 1 }} />

        <List>
          {settingsItems.map(item => renderNavigationItem(item))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          Blue Ocean Logistics v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: open ? width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
