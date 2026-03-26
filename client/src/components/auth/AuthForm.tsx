import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { authStore } from '../../store/authStore';

export function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await authStore.login(username, password);
    } catch (e) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={300}
      margin="100px auto"
    >
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
}
