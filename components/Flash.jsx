'use client'
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Flash({ message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success" onClose={() => setFlashMessage(null)}>
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
};
