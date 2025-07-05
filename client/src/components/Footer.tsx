import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import {
  DirectionsBoat,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Twitter,
  Facebook,
} from '@mui/icons-material';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'primary.contrastText',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DirectionsBoat sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Blue Ocean Logistics
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
              Your trusted partner for global ocean freight logistics.
              Connecting continents through reliable maritime transportation.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                aria-label="Facebook"
              >
                <Facebook />
              </IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Ocean Freight
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Container Shipping
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Cargo Tracking
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Freight Booking
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Route Planning
              </Link>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Dashboard
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Track Shipment
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Get Quote
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Port Directory
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Support
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.8)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  1234 Harbor Blvd<br />
                  Los Angeles, CA 90731
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.8)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.8)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  info@blueoceanlogistics.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            © {currentYear} Blue Ocean Logistics. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
