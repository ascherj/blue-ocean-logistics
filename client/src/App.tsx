import { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Chip,
  TextField,
} from '@mui/material';
import {
  DirectionsBoat,
  Anchor,
  Waves,
  TrendingUp,
} from '@mui/icons-material';
import { oceanTheme } from './theme';

function App() {
  const [shipmentCount, setShipmentCount] = useState(42);

  return (
    <ThemeProvider theme={oceanTheme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <DirectionsBoat sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ocean Freight Logistics Platform
          </Typography>
          <Button color="inherit" startIcon={<Anchor />}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Blue Ocean Logistics
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your digital marketplace for maritime transportation
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <DirectionsBoat color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Active Shipments</Typography>
                </Box>
                <Typography variant="h3" color="primary">
                  {shipmentCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Currently in transit
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => setShipmentCount(count => count + 1)}
                  startIcon={<TrendingUp />}
                >
                  Track Shipment
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Waves color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Ocean Routes</Typography>
                </Box>
                <Typography variant="h3" color="secondary">
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available routes
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label="Pacific" size="small" sx={{ mr: 1 }} />
                  <Chip label="Atlantic" size="small" sx={{ mr: 1 }} />
                  <Chip label="Indian" size="small" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Anchor color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Ports Connected</Typography>
                </Box>
                <Typography variant="h3" color="success.main">
                  156
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Global network
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Booking
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      label="Origin Port"
                      placeholder="e.g., Los Angeles"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      label="Destination Port"
                      placeholder="e.g., Shanghai"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      label="Cargo Type"
                      placeholder="e.g., Containers"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ height: '56px' }}
                    >
                      Search Routes
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Experience the power of our ocean-themed Material-UI design system
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
