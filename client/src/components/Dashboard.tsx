import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
} from '@mui/material';
import {
  LocalShipping,
  TrendingUp,
  Schedule,
  Assessment,
  DirectionsBoat,
  Anchor,
  Warning,
  CheckCircle,
  MoreVert,
  Refresh,
} from '@mui/icons-material';

interface DashboardMetric {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface RecentActivity {
  id: string;
  type: 'shipment' | 'route' | 'port' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function Dashboard() {
  const metrics: DashboardMetric[] = [
    {
      title: 'Active Shipments',
      value: 247,
      change: '+12%',
      changeType: 'increase',
      icon: <LocalShipping />,
      color: 'primary',
    },
    {
      title: 'In Transit',
      value: 89,
      change: '+5%',
      changeType: 'increase',
      icon: <DirectionsBoat />,
      color: 'secondary',
    },
    {
      title: 'Delivered Today',
      value: 34,
      change: '+8%',
      changeType: 'increase',
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      title: 'Pending Issues',
      value: 7,
      change: '-15%',
      changeType: 'decrease',
      icon: <Warning />,
      color: 'warning',
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'shipment',
      title: 'Shipment OFLP-2024-001 Delivered',
      description: 'Container delivered to Shanghai Port',
      timestamp: '2 hours ago',
      status: 'success',
    },
    {
      id: '2',
      type: 'alert',
      title: 'Route Delay Alert',
      description: 'LAX-SHA route experiencing 4-hour delay',
      timestamp: '3 hours ago',
      status: 'warning',
    },
    {
      id: '3',
      type: 'shipment',
      title: 'New Booking Created',
      description: 'OFLP-2024-045 from Los Angeles to Hamburg',
      timestamp: '5 hours ago',
      status: 'info',
    },
    {
      id: '4',
      type: 'port',
      title: 'Port Status Update',
      description: 'Rotterdam Port operations resumed',
      timestamp: '6 hours ago',
      status: 'success',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'primary';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'shipment': return <LocalShipping />;
      case 'route': return <DirectionsBoat />;
      case 'port': return <Anchor />;
      case 'alert': return <Warning />;
      default: return <Assessment />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <IconButton color="primary">
          <Refresh />
        </IconButton>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${metric.color}.light`,
                      color: `${metric.color}.contrastText`,
                      mr: 2,
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="div">
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.title}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp
                    sx={{
                      fontSize: 16,
                      mr: 0.5,
                      color: metric.changeType === 'increase' ? 'success.main' : 'error.main'
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: metric.changeType === 'increase' ? 'success.main' : 'error.main'
                    }}
                  >
                    {metric.change}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <List>
              {recentActivity.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemIcon sx={{ mt: 1 }}>
                      {getActivityIcon(activity.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2">
                            {activity.title}
                          </Typography>
                                                     <Chip
                             label={activity.status}
                             size="small"
                             color={getStatusColor(activity.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
                           />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.timestamp}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Route Performance
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">LAX - SHA</Typography>
                <Typography variant="body2">92%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={92} />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">NYC - HAM</Typography>
                <Typography variant="body2">87%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={87} />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">MIA - ROT</Typography>
                <Typography variant="body2">95%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={95} />
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Chip
                label="Track Shipment"
                clickable
                variant="outlined"
                icon={<LocalShipping />}
              />
              <Chip
                label="New Booking"
                clickable
                variant="outlined"
                icon={<Schedule />}
              />
              <Chip
                label="Port Status"
                clickable
                variant="outlined"
                icon={<Anchor />}
              />
              <Chip
                label="Generate Report"
                clickable
                variant="outlined"
                icon={<Assessment />}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
