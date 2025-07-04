import { Chip, Box, Typography, Tooltip } from '@mui/material';
import { CheckCircle, Error, HourglassEmpty } from '@mui/icons-material';
import { useApiHealth } from '../hooks/useShipments';

export function ApiStatus() {
  const { data: healthData, isLoading, error, isError } = useApiHealth();

  const getStatusInfo = () => {
    if (isLoading) {
      return {
        label: 'Checking...',
        color: 'default' as const,
        icon: <HourglassEmpty />,
        tooltip: 'Checking API connectivity',
      };
    }

    if (isError || error) {
      return {
        label: 'API Offline',
        color: 'error' as const,
        icon: <Error />,
        tooltip: 'API is not responding. Using mock data.',
      };
    }

    if (healthData?.data?.status === 'healthy') {
      return {
        label: 'API Online',
        color: 'success' as const,
        icon: <CheckCircle />,
        tooltip: 'API is healthy and responding',
      };
    }

    return {
      label: 'Mock Mode',
      color: 'warning' as const,
      icon: <HourglassEmpty />,
      tooltip: 'Using mock data for development',
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Status:
      </Typography>
      <Tooltip title={statusInfo.tooltip}>
        <Chip
          icon={statusInfo.icon}
          label={statusInfo.label}
          color={statusInfo.color}
          size="small"
          variant="outlined"
        />
      </Tooltip>
    </Box>
  );
}
