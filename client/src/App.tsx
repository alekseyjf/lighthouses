import { lazy, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, CircularProgress } from '@mui/material';
import { authStore } from './store/authStore';
import { AuthForm } from './components/auth/AuthForm';
import { AppToolbar } from './components/toolbar/Toolbar';
import './App.css';

const MapView = lazy(() =>
  import('./shared/widgets/MapView').then((m) => ({ default: m.MapView }))
);

const MapLoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{ height: 'calc(97vh - 70px)', width: '100%', mt: '70px' }}
  >
    <CircularProgress />
  </Box>
);

const App = observer(() => {
  if (!authStore.isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <>
      <AppToolbar />
      <Suspense fallback={<MapLoadingFallback />}>
        <MapView />
      </Suspense>
    </>
  );
});

export default App;
