import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { authStore } from '../../store/authStore';

export function AppToolbar() {
  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Map App</Typography>

        <Button color="inherit" onClick={() => authStore.logout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
