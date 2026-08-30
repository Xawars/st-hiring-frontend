import type { Settings } from '../types/settings.ts';

export const getSettings = async (): Promise<Settings> => {
  const response = await fetch('/settings');

  if (!response.ok) {
    throw new Error(`Failed to fetch settings: ${response.status}`);
  }

  return response.json();
};

export const saveSettings = async (settings: Settings): Promise<Settings> => {
  const response = await fetch('/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error(`Failed to save settings: ${response.status}`);
  }

  return response.json();
};
