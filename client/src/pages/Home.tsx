import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  DirectionsBoat,
  LocalShipping,
  Search,
  Schedule,
  Assessment,
  Anchor,
  TrendingUp,
  Security,
  Speed,
  Public,
} from '@mui/icons-material';
import { Dashboard } from '../components/Dashboard';

export function Home() {
  const features = [
    {
      icon: <LocalShipping />,
      title: 'Shipment Management',
      description: 'Track and manage all your ocean freight shipments in real-time with comprehensive visibility.',
      action: 'Manage Shipments',
    },
    {
      icon: <Search />,
      title: 'Real-time Tracking',
      description: 'Monitor your cargo location and status with live updates from vessels and ports worldwide.',
      action: 'Track Shipments',
    },
    {
      icon: <Schedule />,
      title: 'Route Planning',
      description: 'Optimize shipping routes and schedules to reduce costs and improve delivery times.',
      action: 'Plan Routes',
    },
    {
      icon: <Assessment />,
      title: 'Analytics & Reports',
      description: 'Generate detailed reports and analytics to make data-driven shipping decisions.',
      action: 'View Reports',
    },
  ];

  const benefits = [
    {
      icon: <Speed />,
      title: 'Faster Processing',
      description: 'Reduce paperwork and processing time by up to 60%',
    },
    {
      icon: <Security />,
      title: 'Enhanced Security',
      description: 'Advanced security measures to protect your cargo data',
    },
    {
      icon: <Public />,
      title: 'Global Network',
      description: 'Connect with ports and carriers worldwide',
    },
    {
      icon: <TrendingUp />,
      title: 'Cost Optimization',
      description: 'Reduce shipping costs through intelligent routing',
    },
  ];

  const recentUpdates = [
    {
      title: 'New Port Integration',
      description: 'Added support for 15 new European ports',
      type: 'feature',
    },
    {
      title: 'Enhanced Tracking',
      description: 'Real-time GPS tracking now available for all routes',
      type: 'improvement',
    },
    {
      title: 'API Updates',
      description: 'New REST API endpoints for third-party integrations',
      type: 'technical',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #003366 0%, #008080 100%)',
          color: 'white',
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Ocean Freight Logistics Platform
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Streamline your maritime shipping operations with our comprehensive logistics solution.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DirectionsBoat />}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Search />}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Track Shipment
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: 'center' }}>
                <DirectionsBoat sx={{ fontSize: 200, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Dashboard Section */}
        <Dashboard />

        {/* Features Section */}
        <Box sx={{ py: 6 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Everything you need to manage your ocean freight operations
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                          mr: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      {feature.action}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ py: 6 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Why Choose Our Platform?
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: 'secondary.light',
                      color: 'secondary.contrastText',
                      mb: 2,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recent Updates Section */}
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Recent Updates
              </Typography>
              <List>
                {recentUpdates.map((update, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemIcon>
                      <Anchor />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {update.title}
                          </Typography>
                          <Chip
                            label={update.type}
                            size="small"
                            color={update.type === 'feature' ? 'success' : 'primary'}
                          />
                        </Box>
                      }
                      secondary={update.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Stats
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Active Ports</Typography>
                    <Typography variant="body2" fontWeight="bold">127</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Partner Carriers</Typography>
                    <Typography variant="body2" fontWeight="bold">45</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Countries Served</Typography>
                    <Typography variant="body2" fontWeight="bold">89</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Monthly Shipments</Typography>
                    <Typography variant="body2" fontWeight="bold">2,847</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
