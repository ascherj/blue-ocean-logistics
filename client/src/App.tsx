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
  CardActions,
  Button,
  Box,
  Grid,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  DirectionsBoat,
  Anchor,
  Waves,
  TrendingUp,
  Search,
  Refresh,
} from '@mui/icons-material';
import { oceanTheme } from './theme';
import { useShipments } from './hooks/useShipments';
import type { QueryFilters } from './lib/queryClient';
import { ApiStatus } from './components/ApiStatus';

function App() {
  const [shipmentCount, setShipmentCount] = useState(42);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [cargoTypeFilter, setCargoTypeFilter] = useState<string>('');

  // Build filters object for TanStack Query
  const filters: QueryFilters = {};
  if (statusFilter) filters.status = statusFilter;
  if (cargoTypeFilter) filters.cargoType = cargoTypeFilter;

  // Use TanStack Query hook
  const { data: shipmentsData, isLoading, error, refetch, isFetching } = useShipments(filters);

  const handleClearFilters = () => {
    setStatusFilter('');
    setCargoTypeFilter('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'primary';
      case 'Loading': return 'warning';
      case 'Delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <ThemeProvider theme={oceanTheme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <DirectionsBoat sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ocean Freight Logistics Platform
          </Typography>
          <ApiStatus />
          <Button color="inherit" startIcon={<Anchor />} sx={{ ml: 2 }}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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

          {/* TanStack Query Demo - Shipments Section */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
                    Live Shipments Tracking
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={isFetching ? <CircularProgress size={16} /> : <Refresh />}
                    onClick={() => refetch()}
                    disabled={isFetching}
                  >
                    {isFetching ? 'Refreshing...' : 'Refresh'}
                  </Button>
                </Box>

                {/* Filters */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>Status Filter</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Status Filter"
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <MenuItem value="">All Statuses</MenuItem>
                        <MenuItem value="In Transit">In Transit</MenuItem>
                        <MenuItem value="Loading">Loading</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>Cargo Type Filter</InputLabel>
                      <Select
                        value={cargoTypeFilter}
                        label="Cargo Type Filter"
                        onChange={(e) => setCargoTypeFilter(e.target.value)}
                      >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Automotive Parts">Automotive Parts</MenuItem>
                        <MenuItem value="Textiles">Textiles</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleClearFilters}
                      sx={{ height: '56px' }}
                    >
                      Clear Filters
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 3 }} />

                {/* Loading State */}
                {isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading shipments...</Typography>
                  </Box>
                )}

                {/* Error State */}
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    Failed to load shipments. Please try again.
                  </Alert>
                )}

                {/* Shipments Data */}
                {shipmentsData && !isLoading && (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Showing {shipmentsData.data.length} of {shipmentsData.pagination.total} shipments
                    </Typography>

                    <Grid container spacing={2}>
                      {shipmentsData.data.map((shipment) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={shipment.id}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {shipment.trackingNumber}
                              </Typography>
                              <Chip
                                label={shipment.status}
                                color={getStatusColor(shipment.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'default'}
                                size="small"
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                <strong>Route:</strong> {shipment.origin} → {shipment.destination}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <strong>Cargo:</strong> {shipment.cargoType}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <strong>ETA:</strong> {shipment.estimatedArrival}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small">Track Details</Button>
                              <Button size="small">View Documents</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    {shipmentsData.data.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No shipments found matching your filters.
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
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
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                          Quick Freight Booking
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Origin Port"
                              variant="outlined"
                              placeholder="e.g., Los Angeles"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Destination Port"
                              variant="outlined"
                              placeholder="e.g., Shanghai"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Cargo Type"
                              variant="outlined"
                              placeholder="e.g., Electronics"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Departure Date"
                              type="date"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            startIcon={<Search />}
                            size="large"
                          >
                            Search Routes & Get Quote
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                          Quick Stats
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h4" color="primary">
                            {shipmentsData?.pagination.total || 0}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Active Shipments
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h4" color="secondary">
                            15
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Available Routes
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4" color="success.main">
                            98.5%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            On-Time Delivery
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
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
