import React, { useState, useEffect } from 'react';
import { TextInput, NumberInput, Button, Container, Title, Stack, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

interface PlexSettings {
  id?: number;
  host: string;
  port: number;
  auth_token: string;
}

export default function SettingsForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const form = useForm<PlexSettings>({
    initialValues: {
      host: '',
      port: 32400,
      auth_token: '',
    },
    validate: {
      host: (value) => (value.length > 0 ? null : 'Host is required'),
      port: (value) => (value > 0 && value <= 65535 ? null : 'Port must be between 1 and 65535'),
      auth_token: (value) => (value.length > 0 ? null : 'Auth token is required'),
    },
  });

  useEffect(() => {
    // Load existing settings
    fetch('/api/settings')
      .then(response => response.json())
      .then(data => {
        if (data) {
          form.setValues(data);
        }
      })
      .catch(error => console.error('Error loading settings:', error));
  }, []);

  const handleSubmit = async (values: PlexSettings) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
        },
        body: JSON.stringify({ plex_setting: values }),
      });

      if (response.ok) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage('Error saving settings');
      }
    } catch (error) {
      setMessage('Error saving settings');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper shadow="sm" p="xl" radius="md">
        <Title order={1} mb="lg">Plex Server Settings</Title>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Host"
              placeholder="192.168.1.100 or plex.example.com"
              {...form.getInputProps('host')}
              required
            />

            <NumberInput
              label="Port"
              placeholder="32400"
              min={1}
              max={65535}
              {...form.getInputProps('port')}
              required
            />

            <TextInput
              label="Auth Token"
              placeholder="Your Plex authentication token"
              type="password"
              {...form.getInputProps('auth_token')}
              required
            />

            <Button type="submit" loading={loading} fullWidth mt="md">
              Save Settings
            </Button>

            {message && (
              <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '1rem' }}>
                {message}
              </div>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
