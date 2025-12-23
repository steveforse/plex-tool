import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import SettingsForm from '../components/SettingsForm';
import '@mantine/core/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('settings-root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <MantineProvider>
          <SettingsForm />
        </MantineProvider>
      </React.StrictMode>
    );
  }
});
