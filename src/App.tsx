import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Events from './features/events/Events.tsx';
import SettingsForm from './features/settings/SettingsForm.tsx';
import { fetchSettings } from './features/settings/settingsSlice.ts';
import type { AppDispatch } from './store.ts';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          value={tab}
          onChange={(_event, value: number) => setTab(value)}
          variant="fullWidth"
          aria-label="Application views"
        >
          <Tab label="Events" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      {tab === 0 ? <Events /> : <SettingsForm />}
    </Box>
  );
}

export default App;
