import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { AppDispatch, RootState } from '../../store.ts';
import { fetchEvents } from './eventsSlice.ts';

export default function Events() {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  const loading = useSelector((state: RootState) => state.events.loading);
  const error = useSelector((state: RootState) => state.events.error);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
      >
        Events
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, overflowWrap: 'anywhere' }}>
          {error}
        </Alert>
      )}
      {loading && events.length === 0 && (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          sx={{ py: 2 }}
        >
          <CircularProgress size={24} />
          <Typography>Loading events...</Typography>
        </Stack>
      )}
      <Grid container spacing={{ xs: 2, md: 3 }} component="section">
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ overflowWrap: 'anywhere' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {event.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {event.description}
                </Typography>
                <Typography variant="body2">
                  {event.location ?? 'Location not specified'}
                </Typography>
                <Typography variant="body2">
                  {new Date(event.date).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  {event.availableTickets.length} available tickets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
